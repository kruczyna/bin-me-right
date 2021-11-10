import { TrashItemModel } from "../database/trashItem/trashItem.model";
import { connectWithDatabase, disconnectDatabase } from "../database/database";
(async () => {
  connectWithDatabase();
  const trashItems = [
    { name: "Apple", binAssignment: "Bio", isBreakable: false },
    { name: "Pineapple", binAssignment: "Bio", isBreakable: false },
    { name: "Candy", binAssignment: "Mix", isBreakable: false },
    { name: "Box", binAssignment: "Carbord", isBreakable: true },
    { name: "Tea", binAssignment: "Bio", isBreakable: false },
    { name: "Coffie", binAssignment: "Bio", isBreakable: false },
    { name: "Oatmeal", binAssignment: "Bio", isBreakable: false },
    { name: "Grapes", binAssignment: "Bio", isBreakable: false },
    { name: "Dumplings", binAssignment: "Mix", isBreakable: false },
    { name: "Potato", binAssignment: "Bio", isBreakable: false },
  ];
  try {
    for (const trashItem of trashItems) {
      await TrashItemModel.create(trashItem);
      console.log(`Created item ${trashItem.name}`);
    }
    disconnectDatabase();
  } catch (e) {
    console.error(e);
  }
})();
