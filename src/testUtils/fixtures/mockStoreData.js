export const trips = [
  {
    _id: "1",
    uid: "1",
    destination: "Hawaii",
    startDate: 10000000000,
    endDate: 200000000000000,
    photo:
      "https://images.unsplash.com/photo-1549317487-92cec5e76645?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjc5ODc0fQ",
    photoAttribution: "photo attribution"
  }
];

export const budgetCategories = [
  {
    _id: "1",
    uid: "1",
    tripId: "1",
    budgetCategory: "Airfare",
    notes: ""
  }
];

export const budgetItems = [
  {
    _id: "1",
    uid: "1",
    tripId: "1",
    budgetCategoryId: "1",
    budgetItem: "Flights",
    estimatedCost: "2000.00",
    notes: ""
  }
];

export const expenses = [
  {
    _id: "1",
    uid: "1",
    tripId: "1",
    budgetCategoryId: "1",
    budgetItemId: "1",
    summary: "Southwest",
    currency: "USD",
    originalCost: "594.62",
    cost: "594.62",
    date: 10000000000,
    notes: ""
  }
];

export const auth = {
  uid: "1",
  displayName: "Lilliana Rose",
  email: "",
  photoURL: "https://picsum.photos/id/947/45/45"
};
