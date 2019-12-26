import axios from 'axios';
import { authHeader, getCookie } from '../utils/authHeader';

export const services = {
  login,
  getTables,
  createBills,
  getBillDetails,
  getListDishDoing,
  getFinishDish,
  getStartDish
}


function login(email, password) {
  return fetch('/user/login', {
    method : "POST",
    headers : { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(res => res)
  .catch(err=> {throw err})
}

function getTables() {
  return fetch('/table/get-all', {
    method: 'GET',
    headers: authHeader()
  }).then(res => res.json()).then(res => res).catch(err => {throw err})
}

function createBills(tables) {
  return fetch('/bill/create', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({tables})
  }).then(res => res.json()).then(res => res).catch(err => {throw err})
}

function getListDishDoing() {
  return fetch(`/preparingDish/get-current`, {
    method: 'GET',
    headers: authHeader()
  }).then(res => res.json()).then(res => res).catch( err=> {throw err})
}

function getBillDetails(id) {
  return fetch(`/bill/get/${id}`, {
    method: 'GET',
    headers: authHeader()
  }).then(res => res.json()).then(res => res)
}

function getFinishDish(id){
  return fetch(`/preparingDish/finish/${id}`, {
    method: 'PATCH',
    headers: authHeader()
  }).then(res => res.json()).then(res => res).catch( err=> {throw err})
}

function getStartDish(id){
  return fetch(`/preparingDish/start/${id}`, {
    method: 'PATCH',
    headers: authHeader()
  }).then(res => res.json()).then(res => res).catch( err=> {throw err})
}

