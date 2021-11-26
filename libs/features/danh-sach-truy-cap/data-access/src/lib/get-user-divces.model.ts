export interface IGetUserDevices {
  Id: {
    Timestamp: number;
    Machine: number;
    Pid: number;
    Increment: number;
    CreationTime: Date;
  };
  CreatedAt: Date;
  Type: string;
  OsName: string;
  OsVersion: string;
  EngineName: string;
  EngineVersion: string;
  BrowserName: string;
  BrowserVersion: string;
  IpAddress: string;
  CityName: string;
  CountryName: string;
  CountryIsoCode: string;
  TimeZone: string;
  PostalCode: string;
  UserAgent: string;
  DeviceHash: string;
  LoggedTime: number;
  IDCurrentUserLogin: number;
  RefreshToken: string;
  RefreshTokenExpiryMinutes: number;
  SessionCode: string;
}
