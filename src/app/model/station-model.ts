export class StationModel {
  id: number;
  stationName: string;
  stationFullname: string;
  colorMappingEntity: { colorFullname: string; colorName: string };

  constructor(
    id: number = 0,
    stationName: string = '',
    stationFullname: string = '',
    colorMappingEntity: { colorFullname: string; colorName: string } = { colorFullname: '', colorName: '' }
  ) {
    this.id = id;
    this.stationName = stationName;
    this.stationFullname = stationFullname;
    this.colorMappingEntity = colorMappingEntity;
  }
}
