import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskProps {
  taskId: number;
  newTaskTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskSameTitle = tasks.find((task) => task.title === newTaskTitle);

    if (taskSameTitle) {
      return Alert.alert(
        'Task já cadastrada!',
        'Você não pode cadastrar uma task com o mesmo nome',
      );
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map((task) => ({ ...task }));

    const foundItem = updateTasks.find((item) => item.id === id);

    if (!foundItem) {
      return;
    }

    foundItem.done = !foundItem.done;
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',

      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => {
            const updateTasks = tasks.filter((task) => task.id !== id);
            setTasks(updateTasks);
          },
        },
      ],
    );
  }

  function handleEditTask({ taskId, newTaskTitle }: EditTaskProps) {
    const updateTasks = tasks.map((task) => ({ ...task }));

    const taskUpdate = updateTasks.find((task) => task.id === taskId);

    if (!taskUpdate) {
      return;
    }

    taskUpdate.title = newTaskTitle;
    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
