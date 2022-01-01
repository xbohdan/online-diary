// LocalStorage.getItem returns null if item was not found

export interface IAuth {
  token: string | null;
  expiration?: string | null;
}
