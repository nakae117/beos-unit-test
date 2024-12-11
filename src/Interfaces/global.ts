export interface Tab1Data { name: string; description: string }

export interface Tab2Data { nro1: string; nro2: string }

export interface Tab3Data { note: string }

export interface Tab {
    name: string;
    label: string;
  }
export interface AppActionsType extends Vue {
    tab: string;
    tabs: Tab[];
    data: dataAppActions;
}

export interface Tab1Type extends Vue {
    data: Tab1Data;
}

export interface Tab2Type extends Vue {
    data: Tab2Data;
    result: string;
}

export interface dataAppActions {
    tab1: Tab1Data,
    tab2: Tab2Data,
    tab3: Tab3Data,
}