export interface Item {
  id: string;
  name: string;
  description: string;
  details: string;
  sizes: string[];
  colors: string[];
  genders: string[];
  compressionClasses: string[];
  category: Category;
  images: string[];
  price: number;
  priceSale: number;
  added: boolean;
  favorite: boolean;
  leftCount: number;
}

export interface ItemOptions {
  size: string;
  color: string;
  gender: string;
  compressionClass: string;
}

export enum Category {
  corset_abdominal = "Абдомінальні корсети",
  bandage_foot = "Бандажі для гомілковостопного суглоба та стопи",
  bandage_shoulder = "Бандажі для плечового та ліктьового суглобів",
  bandage_arm = "Бандажі та шини для руки",
  child = "Дитячі ортопедичні вироби",
  bandage_elastic = "Еластичні бандажі та інша продукція",
  nexus = "Компресійна регульована продукція Nexus",
  bandage_knee = "Наколінники та бандажі для стабілізації коліна",
  child_shoe = "Ортопедичне взуття для дітей",
  pillow = "Ортопедичні подушки memory foam",
  corset_breast = "Поперекові корсети",
  varicose = "Противарикозні компресійні вироби",
  silicopad = "Силіконова продукція марки Siliciopad",
  collar = "Шийні комірці",
  bandage_wrist = "Шини-бандажі на зап'ястя",
  temp_furniture = "Furniture",
  temp_wearing = "Wearing",
}
