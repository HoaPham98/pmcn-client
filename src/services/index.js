import axios from 'axios';
import { authHeader, getCookie } from '../utils/authHeader';

export const services = {
  login,
  getTables,
  createBills,
  getBillDetails,
  getListDishes,
  serveDish,
  createOrder,
  requestPayment,
  returnDish,
  confirmPayment,
  getPendingBills,
  completeBill,
  getListDishDoing,
  getFinishDish,
  getStartDish,
  createDish,
  deleteDish

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

function getListDishes() {
  return fetch('/dish/get-all', {
    method: 'GET',
    headers: authHeader()
  }).then(res => res.json()).then(res => res)
}

function serveDish(orderId, dishId) {
  return fetch(`/order/finishDish?idOrder=${orderId}&idDish=${dishId}`, {
    method: 'PATCH',
    headers: authHeader()
  }).then(res => res.json()).then(res => res)
}

function createOrder(billId, dishes) {
  return fetch(`/bill/addOrder/${billId}`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({dishes: dishes})
  }).then(res => res.json()).then(res => res)
}

function requestPayment(billId) {
  return fetch(`/bill/createFinalOrder/${billId}`, {
    method: 'GET',
    headers: authHeader()
  }).then(res => res.json()).then(res => res)
}

function returnDish(billId, dishId, quantity) {
  return fetch(`/bill/returnDish/${billId}`, {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify({dish: dishId, quantity: quantity})
  }).then(res => res.json()).then(res => res)
}

function confirmPayment(billId) {
  return fetch(`/bill/checkout/${billId}`,{
    method: 'PATCH',
    headers: authHeader()
  }).then(res => res.json()).then(res => res)
}

function getPendingBills() {
  return fetch('/bill/getLastestPending', {
    method: 'GET',
    headers: authHeader()
  }).then(res => res.json()).then(res => res)
}

function completeBill(id) {
  return fetch(`/bill/complete/${id}`, {
    method: 'POST',
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

function createDish(name, price, unit, availableTime, isAvailable ) {
  return fetch('dish/create', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({name, price, unit, availableTime, isAvailable})
  }).then(res => res.json()).then(res => res).catch(err => {throw err})
}

function deleteDish(id) {
  return fetch(`/dish/delete/${id}`, {
    method: 'DELETE',
    headers: authHeader()
  }).then(res => res.json()).then(res => res)
}