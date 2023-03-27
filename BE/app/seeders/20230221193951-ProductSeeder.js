"use strict";
const Sequelize = require("sequelize");
const randtoken = require("rand-token");
const { Product } = require("../models");
const loremPicsum = require("lorem-picsum");

const products = [
    {
        id: randtoken.uid(16),
        name: "Men's Running Shoes",
        desc: "Comfortable and durable running shoes for men.",
        price: 120000,
        image: "https://source.unsplash.com/featured/500x500",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: randtoken.uid(16),
        name: "Women's Running Shoes",
        desc: "Lightweight and breathable running shoes for women.",
        price: 85000,
        image: "https://source.unsplash.com/featured/500x500",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: randtoken.uid(16),
        name: "Men's T-Shirt",
        desc: "Comfortable and stylish t-shirt for men.",
        price: 75000,
        image: "https://source.unsplash.com/featured/500x500",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: randtoken.uid(16),
        name: "Women's T-Shirt",
        desc: "Soft and stretchy t-shirt for women.",
        price: 60000,
        image: "https://source.unsplash.com/featured/500x500",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: randtoken.uid(16),
        name: "Men's Hoodie",
        desc: "Warm and comfortable hoodie for men.",
        price: 145000,
        image: "https://source.unsplash.com/featured/500x500",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: randtoken.uid(16),
        name: "Women's Hoodie",
        desc: "Cozy and stylish hoodie for women.",
        price: 125000,
        image: "https://source.unsplash.com/featured/500x500",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: randtoken.uid(16),
        name: "Men's Sunglasses",
        desc: "Stylish and functional sunglasses for men.",
        price: 95000,
        image: "https://source.unsplash.com/featured/500x500",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: randtoken.uid(16),
        name: "Women's Sunglasses",
        desc: "Trendy and comfortable sunglasses for women.",
        price: 80000,
        image: "https://source.unsplash.com/featured/500x500",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: randtoken.uid(16),
        name: "Men's Backpack",
        desc: "Spacious and durable backpack for men.",
        price: 175000,
        image: "https://source.unsplash.com/featured/500x500",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: randtoken.uid(16),
        name: "Women's Backpack",
        desc: "Stylish and practical backpack for women.",
        price: 155000,
        image: "https://source.unsplash.com/featured/500x500",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Products", products, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Products", null, {});
    },
};
