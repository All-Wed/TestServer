<template>
  <div class="container pt-3" id="app" v-cloak>
    <h1>Front Rest API</h1>
    <div>
      <form class="form-inline mb-3" @submit.prevent="createContact">
        <div class="form-group m-2">
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            id="name"
            v-model="form.name"
          />
        </div>
        <div class="form-group m-2">
          <input
            type="text"
            class="form-control"
            placeholder="Value"
            id="value"
            v-model="form.value"
          />
        </div>
        <div class="form-group m-2">
          <button class="btn btn-primary" type="submit" :disabled="!canCreate">
            Создать
          </button>
        </div>
      </form>

      <div v-if="contacts.length">
        <div class="card mb-3" v-for="contact in contacts" :key="contact.id">
          <div class="card-body">
            <h5
              class="card-title"
              :style="{ color: contact.marked ? 'red' : 'blue' }"
            >
              {{ contact.name }} - {{ contact.marked }}
            </h5>
            <p>id: {{ contact.id }}</p>
            <p class="card-text">{{ contact.value }}</p>
            <button
              class="btn btn-primary"
              @click="markContact(contact.id)"
              :disabled="contact.marked === 1"
            >
              Отметить
            </button>
            <button class="btn btn-danger" @click="removeContact(contact.id)">
              Удалить
            </button>
          </div>
        </div>
      </div>
      <p v-else>Контактов пока нет</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FirstPage',
  data() {
    return {
      url: '/api/contacts/', // TODO: вынести путь в глобальную переменную. Понять как она использует правильный домен... через path?
      form: {
        name: '',
        value: '',
      },
      contacts: [],
    }
  },
  async mounted() {
    this.getInfo()
  },
  computed: {
    canCreate() {
      return (this.form.name.length > 1) & (this.form.value.length > 1)
    },
  },
  methods: {
    async getInfo() {
      // TODO: настроить заголовки по умолчанию, чтобы не передавать постоянно
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
      const response = await axios.get(this.url, {
        headers: headers,
      })
      // TODO: оставил как пример без .then .catch
      this.contacts = response.data
    },
    async createContact() {
      const data = {
        name: this.form.name,
        value: this.form.value,
      }
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
      await axios
        .post(this.url, data, { headers: headers })
        .then((response) => {
          this.contacts = response.data
        })
        .catch((error) => {
          console.log(error)
        })
      this.form.name = this.form.value = ''
    },
    async removeContact(id) {
      await axios
        .delete(this.url + id)
        .then((response) => {
          this.contacts = response.data.contacts
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async markContact(id) {
      const contact = this.contacts.find((c) => c.id === id)
      // TODO: в данном случае так проще обновлять клиента
      const update = await axios.put(
        // `http://localhost:5000/api/contacts/${id}`,
        `${this.url}/${id}`,
        {
          ...contact,
          marked: true,
        }
      )
      contact.marked = update.data.contacts.marked
    },
  },
}
</script>

<style lang="sass" scoped>
@import '../assets/sass/style'
</style>
