import { subtaskObject } from "@/db/models/Task";
import { uid } from "@/db/models/utils";
import produce from "immer";
import React from "react";

export default function useSubtaskReducer(initial: subtaskObject) {
  /*
 useState is used instead of useReducer because setSubtasks closure is used in the useEffect hook 
*/
  const [subtasks, setSubtasks] = React.useState(initial);
  const renameSubtask = React.useCallback((id: string, name: string) => {
    setSubtasks(state => {
      return produce(state, s => {
        if (name) {
          s[id].name = name;
        } else {
          delete s[id];
        }
      });
    });
  }, []);
  const toggleSubtask = React.useCallback((id: string) => {
    setSubtasks(state => {
      return produce(state, s => {
        s[id].isCompleted = !s[id].isCompleted;
      });
    });
  }, []);

  const deleteSubtask = React.useCallback((id: string) => {
    setSubtasks(state => {
      return produce(state, s => {
        delete s[id];
      });
    });
  }, []);

  const addSubtask = React.useCallback((name: string) => {
    setSubtasks(state => {
      if (!name) return state;
      const id = uid(10);
      return { ...state, [id]: { isCompleted: false, name } };
    });
  }, []);
  return {
    actions: {
      deleteSubtask,
      addSubtask,
      toggleSubtask,
      renameSubtask,
    },
    subtasks,
    setSubtasks,
  };
}
