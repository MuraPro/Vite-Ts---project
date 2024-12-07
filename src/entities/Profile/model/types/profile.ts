import { Country } from "shared/const/common";
import { Currency } from "shared/const/common";

export interface Profile {
  first?: string;
  lastname?: string;
  email?: string;
  age?: string;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
}
