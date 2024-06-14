import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskManagement.css'; // Add your CSS styles

const initialTasks = {
  'todo': [],
  'ongoing': [],
  'completed': []
};

const TaskManagement = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceList = tasks[source.droppableId];
    const destList = tasks[destination.droppableId];
    const [movedTask] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList
    });
  };

  const addTask = (list, task) => {
    setTasks({
      ...tasks,
      [list]: [...tasks[list], task]
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-management">
        {Object.keys(tasks).map((list, index) => (
          <Droppable droppableId={list} key={list}>
            {(provided) => (
              <div
                className="task-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>{list.charAt(0).toUpperCase() + list.slice(1)}</h2>
                {tasks[list].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="task-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{task.title}</p>
                        <p>{task.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <button onClick={() => addTask(list, { id: `${list}-${tasks[list].length + 1}`, title: `Task ${tasks[list].length + 1}`, description: 'New task description' })}>Add Task</button>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskManagement;
