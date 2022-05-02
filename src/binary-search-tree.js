// npm test -- test/binary-search-tree.test

const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {


	constructor() {
		this.r = null;
	}


	// ^------------------------ root ------------------------
	root() {
		return this.r;
	}


	// ^------------------------ add ------------------------
	add(data) {
		this.r = putNode(this.r, data);

		function putNode(node, data) {
			if (node === null) return new Node(data); // if node is null, return new node
			if (node.data === data) return node; // if node data is equal to data, return node

			// if put data is less thaan current node data try to put new node
			if (data < node.data) {
				node.left = putNode(node.left, data);
			} else if (data > node.data){
				node.right = putNode(node.right, data);
			}

			return node;
		}


	}


	// ^------------------------ has ------------------------
	has(data) {

		function hasNode(node, data) {
			if (node === null) { return false; } // if no node return false that meeans cant find data
			if (node.data === data) return node; // if node data is equal to data, return node

			// if put data is try to find in matching node
			if (data < node.data) {
				return hasNode(node.left, data);
			} else if (data > node.data) {
				return hasNode(node.right, data);
			}
		}

		return hasNode(this.r, data) ? true : false;
	}


	// ^------------------------ find ------------------------
	find(data) {

		function findNode(node, data) {

			if (node === null) return null;

			if (node.data === data) return node;

			if (data < node.data) {
				return findNode(node.left, data);
			} else if (data > node.data) {
				return findNode(node.right, data);
			}

		}

		return findNode(this.r, data);
	}


	// ^------------------------ remove ------------------------
	remove(data) {
		this.r = removeNode(this.r, data);

		function removeNode(node, data) {
			if (node === null) return null; // if cant find node return null
			// if (data === node.data) return null;

			if (data < node.data) {
				node.left = removeNode(node.left, data); // update subTree
				return node; // update node
			} else if (data > node.data) {
				node.right = removeNode(node.right, data);
				return node;
			} else {
				if (node.left === null && node.right === null) { // if node is leaf (no have child), delete node
					return null;
				}
				if (node.left === null) { // if node have only left child, replace (and remove) current node with left child
					node = node.right;
					return node;
				}
				if (node.right === null) { // if node have only right child, replace (and remove) current node with right child
					node = node.left;
					return node;
				}

				let minNode = node.left;
				while (minNode.right) {
					minNode = minNode.right;
				}
				node.data = minNode.data;
				node.left = removeNode(node.left, minNode.data);
				return node;

			}
			// return node;
		}
	}


	// ^------------------------ min ------------------------
	min() {
		if (this.r === null) return;
		let node = this.r;
		while (node.left) {
			node = node.left;
		}
		return node.data;
	}


	// ^------------------------ max ------------------------
	max() {
		if (this.r === null) return;
		let node = this.r;
		while (node.right) {
			node = node.right;
		}
		return node.data;
	}


	// ^------------------------ show ------------------------
	show() { // test function
		console.log(this.r);
	}
}

module.exports = {
  BinarySearchTree
};
