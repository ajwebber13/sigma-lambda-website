export type MerchItemId = "polo" | "cap" | "tee";

export type MerchItem = {
  id: MerchItemId;
  name: string;
  price: number;
};

export const merchItems: MerchItem[] = [
  { id: "polo", name: "Old Gold & Black Polo", price: 48.0 },
  { id: "cap", name: "Sigma Lambda Crest Cap", price: 32.0 },
  { id: "tee", name: "Centennial Tee", price: 28.0 },
];

export function getMerchItem(id: string): MerchItem | undefined {
  return merchItems.find((item) => item.id === id);
}
