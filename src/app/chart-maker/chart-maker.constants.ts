export class ChartMakerConstants {
    private constructor(){}

    public static readonly CHART_PROPERTIES = [
        {prop: 'ricoverati_con_sintomi', label: 'Hospitalized with synthoms'},
        {prop: 'terapia_intensiva', label: 'Hospitalized IC'},
        {prop: 'totale_positivi', label: 'Total positives'},
        {prop: 'nuovi_positivi', label: 'New positives'},
        {prop: 'variazione_totale_positivi', label: 'Variation new positives'},
        {prop: 'dimessi_guariti', label: 'Dismissed from hospitals'},
        {prop: 'deceduti', label: 'Died'},
        {prop: 'totale_casi', label: 'Total cases'},
        {prop: 'tamponi', label: 'Tests carried out'},
      ];
}