class Matrix {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.data = Array.from(new Array(this.rows), () => new Array(this.cols));
	}

	add(value) {
		if (value instanceof Matrix) {
			if (value.rows !== this.rows || value.cols !== this.cols) {
				console.log("invalid matrix");
				return;
			}
			this.map((e, i, j) => e + value.data[i][j]);
		} else if (!isNaN(value)) {
			this.map(e => e + value);
		}
		return this;
	}

	static add(matrix, value) {
		if (value instanceof Matrix && matrix instanceof Matrix) {
			if (value.rows !== matrix.rows || value.cols !== matrix.cols) {
				console.log("invalid matrixes")
				return;
			}
			return new Matrix(matrix.rows, matrix.cols)
				.map((e, i, j) => matrix.data[i][j] + value.data[i][j]);
		} else if (!isNaN(value)) {
			return new Matrix(matrix.rows, matrix.cols)
				.map(e => matrix.data[i][j] + value);
		}
	}

	subtract(value) {
		if (value instanceof Matrix) {
			if (value.rows !== this.rows || value.cols !== this.cols) {
				console.log("invalid matrix");
				return;
			}
			this.map((e, i, j) => e - value.data[i][j]);
		} else if (!isNaN(value)) {
			this.map(e => e - value);
		}
		return this;
	}

	static subtract(matrix, value) {
		if (value instanceof Matrix && matrix instanceof Matrix) {
			if (value.rows !== matrix.rows || value.cols !== matrix.cols) {
				console.log("invalid matrixes")
				return;
			}
			return new Matrix(matrix.rows, matrix.cols)
				.map((e, i, j) => matrix.data[i][j] - value.data[i][j]);
		} else if (!isNaN(value)) {
			return new Matrix(matrix.rows, matrix.cols)
				.map(e => matrix.data[i][j] - value);
		}
	}

	multiply(value) {
		if (value instanceof Matrix) {
			if (value.rows !== this.rows || value.cols !== this.cols) {
				console.log("invalid matrix");
				return;
			}
			this.map((e, i, j) => e * value.data[i][j]);
		} else if (!isNaN(value)) {
			this.map(e => e * value);
		}
		return this;
	}

	static multiply(a, b) {
		if (a instanceof Matrix && b instanceof Matrix) {
			if (a.cols !== b.rows) {
				console.log("invalid matrixes");
				return;
			}
			return new Matrix(a.rows, b.cols)
				.map((e, i, j) => {
					let result = 0;
					for (let k = 0; k < a.cols; k++) {
						result += a.data[i][k] * b.data[k][j];
					}
					return result;
				});
		}
	}

	map(func) {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let value = this.data[i][j];
				this.data[i][j] = func(value, i, j);
			}
		}
		return this;
	}

	static map(matrix, func) {
		if (matrix instanceof Matrix) {
			return new Matrix(matrix.rows, matrix.cols)
				.map((e, i, j) => func(matrix.data[i][j]));
		}
	}

	randomize() {
		this.map(e => Math.random() * 2 - 1);
		return this;
	}

	print() {
		console.table(this.data);
		return this;
	}

	static fromArray(array) {
		return new Matrix(array.length, 1).map((e, i) => array[i]);
	}

	static toArray(matrix) {
		let result = [];
		for (let i = 0; i < matrix.rows; i++) {
			for (let j = 0; j < matrix.cols; j++) {
				result.push(matrix.data[i][j]);
			}
		}
		return result;
	}

	static transpose(matrix) {
		if (matrix instanceof Matrix) {
			return new Matrix(matrix.cols, matrix.rows)
				.map((e, i, j) => matrix.data[j][i]);
		}
	}

	clone() {
		return new Matrix(this.rows, this.cols)
			.map((e, i, j) => this.data[i][j]);
	}
}