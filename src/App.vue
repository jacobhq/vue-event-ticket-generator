<template>
  <div id="app">
    <div class="onboarding no-print" v-show="onboarding">
      <section class="no-print" v-show="one">
        <div class="wrapper">
          <p class="tagline">👋 Hello and</p>
          <h1 class="welcome">Welcome</h1>
          <div class="cta">
            <button v-on:click="next">Begin</button>
          </div>
        </div>
      </section>
      <section class="no-print" v-show="two">
        <div class="wrapper">
          <p class="tagline">🎫 About your</p>
          <h1 class="welcome">Event</h1>
          <form class="tickets-form onboard-form" v-on:submit.prevent="preview">
            <input v-model="eventName" placeholder="Enter Event Name" v-validate="{required: true, maxLength: 11}" required />
            <input v-model="eventOrganizer" placeholder="Enter Event Organiser" required />
            <input v-model="eventPrice" placeholder="Enter Event Price" type="number" required />
            <div class="cta">
              <button type="submit">Make tickets</button>
            </div>
          </form>
        </div>
      </section>
      <section class="no-print" v-show="three">
        <div class="wrapper no-print">
          <p class="tagline no-print">✨ Look at your shiny new</p>
          <h1 class="welcome no-print">Ticket</h1>
          <ul class="tickets-list center no-print">
            <li v-for="ticket in tickets" :key="ticket.id">
              <div class="ticket-wrapper">
                <Ticket :event="event" :ticket="ticket" />
              </div>
            </li>
          </ul>
          <form class="tickets-form onboard-form" v-on:submit.prevent="finish(proc_num)">
              <input v-model="number" placeholder="How many tickets?" type="number" style="margin-left: 5px; margin-right: 5px;" required />
              <div class="cta">
                <button v-on:click="back" class="back">Back</button>
                <button type="submit">Finish</button>
              </div>
            </form>
        </div>
      </section>
    </div>
    <div>
      <ul class="tickets-list">
        <li v-for="ticket in tickets" :key="ticket.id">
          <div class="ticket-wrapper">
            <Ticket :event="event" :ticket="ticket" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Ticket from "./components/Ticket";
  import {
    customAlphabet }
  from "nanoid";
  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);
  export default {
    name: "App",
    components: {
      Ticket,
    }
    ,
    data() {
      return {
        onboarding: true,
        one: true,
        two: false,
        three: false,
        number: null,
        proc_num: this.number - 1,
        eventName: null,
        eventOrganizer: null,
        eventPrice: null,
        tickets: [
          {
            id: "DTK-" + nanoid(),
          }
          ,
        ],
      };
    }
    ,
    computed: {
      event() {
        const event = {
          name: this.eventName,
          organiser: this.eventOrganizer,
          price: this.eventPrice,
        };
        return event;
      }
      ,
    }
    ,
    methods: {
      generateTickets() {
        window.print();
      },
      addTicket() {
        this.tickets.push({
          id: "DTK-" + nanoid()
          }
        );
      },
      rmTicket() {
        this.tickets.splice(1, 1);
      },
      next() {
        this.one = false,
        this.two = true
      },
      preview() {
        this.two = false,
        this.three = true
      },
      back() {
        this.three = false,
        this.two = true
      },
      addToArray(i) {
        this.tickets.push(i, {
          id: "DTK-" + nanoid()
          }
        );
      },
      finish(i) {
        this.addToArray(i)
        this.onboarding = false
        this.generateTickets()
        this.onboarding = true
      }
    },
  };
</script>

<style>
    body,
  ul,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .tickets-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
  }
  .tickets-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .tickets-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
  .ticket-wrapper {
    width: 340px;
    padding: 5px;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      background-color: white;
    }
    .no-print,
    .no-print *,
    :not(.print) {
      display: none !important;
    }
  }
  input {
  display: block;
  margin: auto;
  outline: 0;
  border: 1px solid grey;
  font-size: 1.1em;
  border-radius: 5px;
  padding: 5px;
  transition: all 0.3s ease;
  box-shadow: #20fc8e5e 0 0 0px 0px;
}

.valid { border: 1px solid #009688; }

.invalid { border: 1px solid #F44336; }

label {
  display: block;
  text-align: center;
  font-family: sans-serif;
  margin: 7px 0px 5px;
}

input:focus {
  border: 1px solid #20fc8f;
  box-shadow: #20fc8e5e 0 0 0px 3px;
}

button {
  background-color: #20fc8f;
  border: none;
  margin: 3px;
  padding: 7px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: #20fc8e5e 0 0 0px 0px;
  transition: all 0.3s ease;
  color: #0b3954;
}

button:focus {
  box-shadow: #20fc8e5e 0 0 0px 3px;
  border: none;
  outline: none;
}

.onboarding {
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 99;
  background-color: #0b3954;
}

.welcome {
  color: #20fc8f;
  font-size: 8rem;
}
.tagline {
  font-family: monospace;
  color: #20fc8f;
  font-size: 2rem;
}
.wrapper {
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.cta button {
  padding: 20px;
  font-size: 1.25rem;
  font-weight: 700;
}

.onboard-form input {
  margin-left: 2px;
  margin-bottom: 6px;
  width: 100%;
  border: none !important;
  border-bottom: #20fc8f 1px solid !important;
  border-radius: 0;
  background-color: #0b3954;
  color: white;
}

.onboard-form input:focus {
  box-shadow: none;
  border-bottom: #20fc8f 3px solid !important;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center
}
@media only screen and (max-width: 900px) {
  .welcome {
    font-size: 6rem;
  }
  .tagline {
    font-size: 1.5rem;
  }
}

.wrapper .ticket-wrapper {
  margin: 5px;
  border-radius: 4px;
  border: 2px rgba(128, 128, 128, 0.384) dashed;
}

.back {
  background-color: #0b3954;
  color: #20fc8f;
}

</style>