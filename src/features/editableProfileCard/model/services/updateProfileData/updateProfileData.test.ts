import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { updateProfileData } from './updateProfileData';

jest.mock('../../selectors/getProfileForm/getProfileForm', () => ({
    getProfileForm: jest.fn(),
}));

describe('updateProfileData', () => {
    const mockProfile: Profile = {
        first: 'John',
        lastname: 'Doe',
        age: '30',
        country: Country.Korea,
        currency: Currency.KRW,
        city: 'Seoul',
        email: 'john.doe@example.com',
        username: 'johndoe',
        avatar: 'https://example.com/avatar.jpg',
        id: '1',
    };

    it('должен успешно обновить профиль', async () => {
        (getProfileForm as jest.Mock).mockReturnValue(mockProfile);

        const thunk = new TestAsyncThunk(updateProfileData);

        thunk.api.put.mockResolvedValue({ data: mockProfile });

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalledWith('/profile/1', mockProfile);
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockProfile);
    });

    it('должен вернуть ошибку при неудачном запросе', async () => {
        (getProfileForm as jest.Mock).mockReturnValue(mockProfile);

        const thunk = new TestAsyncThunk(updateProfileData);
        // const error = new Error("SERVER_ERROR");
        thunk.api.put.mockRejectedValue('error');

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalledWith('/profile/1', mockProfile);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toStrictEqual(['SERVER_ERROR']); // Используйте toStrictEqual
    });

    it('не должен отправлять запрос, если форма пустая', async () => {
        (getProfileForm as jest.Mock).mockReturnValue(undefined);

        const thunk = new TestAsyncThunk(updateProfileData);

        const result = await thunk.callThunk();

        expect(thunk.api.put).not.toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toStrictEqual(['NO_DATA']); // Используйте toStrictEqual
    });
});
