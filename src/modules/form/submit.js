import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js";
const form = document.querySelector("form");
const clientName = document.getElementById("client");
const selectedDate = document.getElementById("date");

//Date atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

//Carrega a data atual
selectedDate.value = inputToday;
//Data minima

selectedDate.min = inputToday;
form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const name = clientName.value.trim();
    if (!name) {
      return alert("Informe o nome do cliente!");
    }
    const hourSelected = document.querySelector(".hour-selected");

    if (!hourSelected) {
      return alert("Selecione a hora");
    }
    const [hour] = hourSelected.innerText.split(":");

    const when = dayjs(selectedDate.value).add(hour, "hour");
    const id = new Date().getTime();
    await scheduleNew({
      id,
      name,
      when,
    });

    clientName.value = "";

    await schedulesDay();
  } catch (error) {
    alert("Não foi possivel realizar o agendamento");
  }
};
