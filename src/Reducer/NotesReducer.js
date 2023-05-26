export const NotesRducer = (stateNotes, actionNotes) => {
  switch (actionNotes.type) {
    case "LOAD_ALL_NOTES":
      return {
        ...stateNotes,
        allNotes: actionNotes.payload,
        singleNote: actionNotes.payload[0],
      };

    case "SET_CURRENT_NOTE":
      return {
        ...stateNotes,
        singleNote: actionNotes.payload,
      };

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
        singleNote: actionNotes.payload,
        allNotes: newNotes,
      };

    case "ADD_CHILD_NOTE":
      let tempAllNotes = stateNotes.allNotes;

      const findAndInsertChildNote = (arr, id, childObject) => {
        const updatedArr = arr.map((item) => {
          if (item.id === id) {
            return { ...item, children: [...item.children, childObject] };
          }
          if (item.children && item.children.length > 0) {
            const updatedChildren = findAndInsertChildNote(
              item.children,
              id,
              childObject
            );
            return { ...item, children: updatedChildren };
          }
          return item;
        });

        return updatedArr;
      };

      const AllNotesWithChild = findAndInsertChildNote(
        tempAllNotes,
        actionNotes.payload.parentId,
        actionNotes.payload.childNote
      );

      localStorage.setItem("allNotes", JSON.stringify(AllNotesWithChild));

      return {
        ...stateNotes,
        singleNote: actionNotes.payload.childNote,
        allNotes: AllNotesWithChild,
      };

    case "REMOVE_NOTE":
      let allNotesWithDelete = stateNotes.allNotes;

      const findNoteAndDelete = (arr, id) => {
        const updatedArr = arr.filter((item) => {
          if (item.id === id) {
            return false; // Exclude the item with the specified ID
          }
          if (item.children && item.children.length > 0) {
            item.children = findNoteAndDelete(item.children, id);
          }
          return true; // Include other items
        });

        return updatedArr;
      };

      const newAllNotes = findNoteAndDelete(
        allNotesWithDelete,
        actionNotes.payload
      );

      localStorage.setItem("allNotes", JSON.stringify(newAllNotes));

      return {
        ...stateNotes,
        singleNote: newAllNotes[0],
        allNotes: newAllNotes,
      };

    case "EDIT_NOTE":
      let editedNotes = stateNotes.allNotes;

      const findNoteAndUpdate = (arr, id, newContent) => {
        const updatedArr = arr.map((item) => {
          if (item.id === id) {
            return { ...item, ...newContent };
          }
          if (item.children && item.children.length > 0) {
            const updatedChildren = findNoteAndUpdate(
              item.children,
              id,
              newContent
            );
            return { ...item, children: updatedChildren };
          }
          return item;
        });

        return updatedArr;
      };

      const updatedNotes = findNoteAndUpdate(
        editedNotes,
        actionNotes.payload.id,
        actionNotes.payload.newContent
      );

      localStorage.setItem("allNotes", JSON.stringify(updatedNotes));
      return {
        ...stateNotes,
        singleNote: {
          ...stateNotes.singleNote,
          title: actionNotes.payload.title,
        },
        allNotes: updatedNotes,
      };

    default:
      return stateNotes;
  }
};
