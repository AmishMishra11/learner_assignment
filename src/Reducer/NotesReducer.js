export const NotesRducer = (stateNotes, actionNotes) => {
  switch (actionNotes.type) {
    case "LOAD_ALL_NOTES":
      return { ...stateNotes, allNotes: actionNotes.payload };

    case "ADD_PARENT_NOTE":
      let newNotes;
      if (stateNotes?.allNotes?.length !== 0) {
        newNotes = [...stateNotes.allNotes, actionNotes.payload];
      } else {
        newNotes = [actionNotes.payload];
      }

      localStorage.setItem("allNotes", JSON.stringify(newNotes));
      return {
        ...stateNotes,
        allNotes: newNotes,
      };

    case "ADD_CHILD_NOTE":
      // var getChildNotes = function (childNotes, id) {
      //   if (childNotes) {
      //     for (var i = 0; i < childNotes.length; i++) {
      //       if (childNotes[i].id === id) {
      //         return childNotes[i];
      //       }
      //       var found = getChildNotes(childNotes[i].children, id);
      //       if (found) return found;
      //     }
      //   }
      // };

      // var searchItem = getChildNotes(
      //   stateNotes.allNotes,
      //   actionNotes.payload.parentId
      // );

      // var updatedChild = {
      //   ...searchItem,
      //   children: [...searchItem.children, actionNotes.payload.childNote],
      // };

      let tempAllNotes = stateNotes.allNotes.map((item) =>
        item.id === actionNotes.payload.parentId
          ? {
              ...item,
              children: [...item.children, actionNotes.payload.childNote],
            }
          : item
      );
      localStorage.setItem("allNotes", JSON.stringify(tempAllNotes));

      return {
        ...stateNotes,
        allNotes: tempAllNotes,
      };

    case "REMOVE_PARENT_NOTE":
      let newAllNotes = stateNotes.allNotes.filter(
        (item) => item.id !== actionNotes.payload
      );

      return {
        ...stateNotes,
        allNotes: newAllNotes,
      };

    default:
      return stateNotes;
  }
};
