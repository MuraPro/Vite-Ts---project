import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example isArticleEnabled
const featureState = process.argv[3]; // example off/on

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

if (!removedFeatureName) {
    throw new Error('Укажите название фича-флага');
}

if (!featureState) {
    throw new Error('Укажите состояние фичи (on или off)');
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Некорректное значение состояния фичи (on или off)');
}

const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
});

project.addSourceFilesAtPaths('src/**/*.{ts,tsx}');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
    return node
        .getChildren()
        .some(
            (child) =>
                child.isKind(SyntaxKind.Identifier) &&
                child.getText() === toggleFunctionName,
        );
}

function isToggleComponent(node: Node) {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
    return identifier?.getText() === toggleComponentName;
}

const replaceToggleFunction = (node: Node) => {
    const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
    );
    if (!objectOptions) return;

    const offFunctionProperty = objectOptions.getProperty('off');
    const onFunctionProperty = objectOptions.getProperty('on');
    const featureNameProperty = objectOptions.getProperty('name');

    const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    );
    const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    );
    const featureNameText = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getLiteralText();

    if (featureNameText !== removedFeatureName) return;

    if (featureState === 'on' && onFunction) {
        node.replaceWithText(onFunction.getBody().getText());
    } else if (featureState === 'off' && offFunction) {
        node.replaceWithText(offFunction.getBody().getText());
    }
};

const getAttributeNodeByName = (
    jsxAttributes: JsxAttribute[],
    name: string,
) => {
    return jsxAttributes.find((node) => node.getNameNode()?.getText() === name); // Используем getNameNode()
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
    const valueNode = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression();
    return valueNode ? valueNode.getText() : undefined;
};

const replaceComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    const onAttribute = getAttributeNodeByName(attributes, 'on');
    const offAttribute = getAttributeNodeByName(attributes, 'off');
    const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');

    const featureNameText = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getLiteralText();
    if (featureNameText !== removedFeatureName) return;

    const offValue = getReplacedComponent(offAttribute);
    const onValue = getReplacedComponent(onAttribute);

    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue);
    } else if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue);
    }
};

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            replaceToggleFunction(node);
        }

        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement) &&
            isToggleComponent(node)
        ) {
            replaceComponent(node);
        }
    });
});

(async () => {
    await project.save();
})();
