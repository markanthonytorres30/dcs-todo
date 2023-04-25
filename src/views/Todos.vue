<template>
    <div class="main">
        <div class="upper-margin"></div>
        <h2>New Task</h2>
        <div class="w-1">
            <input type="text" :class="{ error: inputError }" placeholder="Add new task" class="w-1 h-50" v-model="task" />
            <p v-if="inputError" class="error">Please add some text.</p>
            <button class="primary" @click="newTask">New Task</button>
        </div>
        <div class="sub-title" v-if="todos.length > 0">
            <h2>List of todos</h2>
        </div>
        <div class="todos">

            <div v-for="todo in todos" :key="todo.id" class="box-info">
                <div class="checkbox-wrapper-15">
                    <input class="inp-cbx" :id="todo.id" v-model="todo.done" @change="updateTask(todo.id)" type="checkbox"
                        style="display: none" />
                    <label class="cbx" :for="todo.id">
                        <span>
                            <svg width="12px" height="9px" viewbox="0 0 12 9">
                                <polyline points="1 5 4 8 11 1"></polyline>
                            </svg>
                        </span>
                        <span>{{ todo.task }}</span>
                    </label>
                </div>

                <div class="actions">
                    <span class="hidden-close material-icons" @click="deleteTask(todo.id)">cancel</span>
                </div>
            </div>


        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { get_todos } from '../api/todos'
export default {
    name: "Todos",
    setup() {
        interface taskObj { id: string, task: String, deleted: boolean, done: boolean }

        let tasks = [{ id: "1", task: "Todo1", deleted: false, done: false }]
        const empty: taskObj[] = []
        const todos = ref(empty)
        const task = ref("")
        const inputError = ref(false)

        const newTask = function () {
            let id = todos.value.length + 1
            inputError.value = false
            if (task.value === "" || task.value === undefined) {
                inputError.value = true
                return
            }
            todos.value.push({ id: String(id), task: task.value, deleted: false, done: false })
            task.value = ""
        }

        onMounted(async () => {
            const res = await get_todos()
            todos.value = res.data

        })

        const deleteTask = function (id: string) {
            todos.value = todos.value.filter((td) => td.id !== id)
        }

        const updateTask = function (id: string) {
            alert("update task" + todos.value.find(td => td.id === id)?.done)
        }


        return { todos, task, inputError, newTask, deleteTask, updateTask }
    }

}
</script>

<style></style>