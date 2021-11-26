export interface IResponseBaseModel<T> {
  TargetUrl: string;
  Success: boolean;
  IsWarning: boolean;
  Errors: [
    {
      Code: number;
      Message: string;
      Details: string;
      ErrorId: string;
    }
  ];
  UnAuthorizedRequest: boolean;
  __ncf: boolean;
  Result?: T;
}
