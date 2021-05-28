class Matrix {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.data = Array.from(new Array(this.rows), () => new Array(this.cols));
	}

	setColumn(index, data) {
		if (index >= this.cols || index < 0) {
			console.log("cannot set column at unexisting index");
			return;
		} else if (data.length !== this.rows) {
			console.log("cannot set column of length other than matrix column length");
			return;
		} else {
			this.map((e, i, j) => {
				if (j === index) {
					return data[i];
				} else {
					return e;
				}
			})
		}
		return this;
	}

	getColumn(index) {
		let result = [];
		if (index >= this.cols || index < 0) {
			console.log("cannot set column at unexisting index");
			return;
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					if (j === index) {
						result.push(this.data[i][j]);
					}
				}
			}
		}
		return result;
	}

	addColumn(data) {
		if(data.length !== this.rows) {
			console.log("cannot add invalid column");
			return;
		} else {
			for (let i = 0; i < this.rows; i++) {
				this.data[i].push(data[i]);
			}
			this.cols++;
			return this;
		}
	}

	setRow(index, data) {
		if (index >= this.rows || index < 0) {
			console.log("cannot set row at unexisting index");
			return;
		} else if (data.length !== this.cols) {
			console.log("cannot set row of length other than matrix row length");
			return;
		} else {
			this.map((e, i, j) => {
				if (i === index) {
					return data[j];
				} else {
					return e;
				}
			})
		}
		return this;
	}

	getRow(index) {
		let result = [];
		if (index >= this.rows || index < 0) {
			console.log("cannot set row at unexisting index");
			return;
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					if (i === index) {
						result.push(this.data[i][j]);
					}
				}
			}
		}
		return result;
	}

	addRow(data) {
		if(data.length !== this.cols) {
			console.log("cannot add invalid row");
			return;
		} else {
			this.data.push(data);
			this.rows++;
			return this;
		}
	}

	static getDeterminantOf(matrix) {
		if (matrix.rows !== matrix.cols) {
			console.log("cannot get determinant of a non square matrix");
			return;
		}
		if (matrix.rows === 2 && matrix.cols === 2) {
			return matrix.getDeterminant2x2();
		} else {
			let determinant = 0;
			for (let i = 0; i < matrix.cols; i++) {
				if (i % 2 === 0) {
					determinant += matrix.data[0][i] * Matrix.getDeterminantOf(matrix.ignoreRowColumn(0, i));
				} else {
					determinant -= matrix.data[0][i] * Matrix.getDeterminantOf(matrix.ignoreRowColumn(0, i));
				}
			}
			return determinant;
		}
	}

	getDeterminant3x3() {
		if (this.rows !== this.cols) {
			console.log("cannot find determinant of a non square matrix");
			return;
		} else if (this.rows !== 3) {
			console.log("cannot calculate determinant of a matrix with dimensions other than 3x3 with this function, try using functions getDeterminantOf or getDeterminant2x2");
			return;
		} else {
			let a = this.data[0][0];
			let b = this.data[0][1];
			let c = this.data[0][2];
			let d1 = new Matrix(2, 2).map((e, i, j) => this.data[i + 1][j + 1]).getDeterminant2x2();
			let d2 = new Matrix(2, 2).map((e, i, j) => this.data[i + 1][j * 2]).getDeterminant2x2();
			let d3 = new Matrix(2, 2).map((e, i, j) => this.data[i + 1][j]).getDeterminant2x2();
			return a * d1 - b * d2 + c * d3;
		}
	}

	getDeterminant2x2() {
		if (this.rows !== this.cols) {
			console.log("cannot find determinant of a non square matrix");
			return;
		} else if (this.rows !== 2) {
			console.log("cannot calculate determinant of a matrix with dimensions other than 2x2 with this function, try using functions getDeterminantOf or getDeterminant3x3");
			return;
		} else {
			return this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0];
		}
	}

	ignoreColumn(index) {
		if (index >= this.cols || index < 0) {
			console.log("cannot remove column at unexisting index");
			return;
		} else {
			let result = new Matrix(this.cols - 1, this.rows);
			result.data = [];
			for (let i = 0; i < this.cols; i++) {
				if (i !== index) {
					result.data.push(this.getColumn(i));
				}
			}
			return Matrix.transpose(result);
		}
	}

	ignoreRow(index) {
		if (index >= this.rows || index < 0) {
			console.log("cannot remove row at unexisting index");
			return;
		} else {
			let result = new Matrix(this.rows - 1, this.cols);
			result.data = [];
			for (let i = 0; i < this.rows; i++) {
				if (i !== index) {
					result.data.push(this.getRow(i));
				}
			}
			return result;
		}
	}

	ignoreRowColumn(rowIndex, colIndex) {
		return this.ignoreRow(rowIndex).ignoreColumn(colIndex);
	}

	invert() {
		if (this.rows !== this.cols) {
			console.log("cannot invert a non square matrix");
			return;
		} else {
			let result = Matrix.identity(this.rows);
			for (let i = 0; i < this.cols; i++) {
				if (this.data[i][i] === 0) {
					for (let j = 0; j < this.rows; j++) {
						if (j === i) continue;
						else if (this.data[j][i] !== 0) {
							this.swapRows(j, i);
							result.swapRows(j, i);
						}
					}
				}
				// 2(a)
				let multNum = 1 / this.data[i][i];
				this.multiplyRowByConst(i, multNum);
				result.multiplyRowByConst(i, multNum);
				for (let j = 0; j < this.rows; j++) {
					if (j === i) continue;
					else {
						let numToMakeNull = this.data[j][i];
						this.addMultipleOfRow(j, i, -numToMakeNull);
						this.data[j][i] = 0;
						result.addMultipleOfRow(j, i, -numToMakeNull);
					}
				}
			}
			this.data = result.data;
			return this;
		}
	}

	static getInverseOf(matrix) {
		if (matrix.rows !== matrix.cols) {
			console.log("cannot invert a non square matrix");
			return;
		} else {
			let result = Matrix.identity(matrix.rows);
			let matrixClone = matrix.clone();
			for (let i = 0; i < matrixClone.cols; i++) {
				if (matrixClone.data[i][i] === 0) {
					for (let j = 0; j < matrixClone.rows; j++) {
						if (j === i) continue;
						else if (matrixClone.data[j][i] !== 0) {
							matrixClone.swapRows(j, i);
							result.swapRows(j, i);
						}
					}
				}
				// 2(a)
				let multNum = 1 / matrixClone.data[i][i];
				matrixClone.multiplyRowByConst(i, multNum);
				result.multiplyRowByConst(i, multNum);
				for (let j = 0; j < matrixClone.rows; j++) {
					if (j === i) continue;
					else {
						let numToMakeNull = matrixClone.data[j][i];
						matrixClone.addMultipleOfRow(j, i, -numToMakeNull);
						result.addMultipleOfRow(j, i, -numToMakeNull);
					}
				}
			}
			return result;
		}
	}

	invertAffinity() {
		if (this.rows !== 4 || this.cols !== 4) {
			console.log("cannot invert a non transformation matrix using this function, try using invert or getInverseOf functions");
			return;
		} else {
			let rotationInv = Matrix.transpose(this.ignoreRowColumn(3, 3)).addColumn([0, 0, 0]).addRow([0, 0, 0, 1]);
			let translationInv = Matrix.identity(4).setColumn(3, [-this.data[0][3], -this.data[1][3], -this.data[2][3], 1]);
			let inverse = Matrix.multiply(rotationInv, translationInv);
			this.data = inverse.data;
			return this;
		}
	}

	static getInverseOfAffinity(matrix) {
		if (matrix.rows !== 4 || matrix.cols !== 4) {
			console.log("cannot invert a non transformation matrix using this function, try using invert or getInverseOf functions");
			return;
		} else {
			let rotationInv = Matrix.transpose(matrix.ignoreRowColumn(3, 3)).addColumn([0, 0, 0]).addRow([0, 0, 0, 1]);
			let translationInv = Matrix.identity(4).setColumn(3, [-matrix.data[0][3], -matrix.data[1][3], -matrix.data[2][3], 1]);
			return Matrix.multiply(rotationInv, translationInv);
		}
	}

	// row elementary operations
	swapRows(r1, r2) {
		if (r1 >= this.rows || r2 >= this.rows || r1 < 0 || r2 < 0) {
			console.log("cannot swap unexisting rows, index out of range")
			return;
		} else {
			let row1 = this.getRow(r1);
			let row2 = this.getRow(r2);

			this.setRow(r1, row2);
			this.setRow(r2, row1);
		}
		return this;
	}

	multiplyRowByConst(r, constant) {
		if (r < 0 || r >= this.rows) {
			console.log("cannot multiply unexisting row by " + constant + ", index out of range");
			return;
		} else {
			this.map((e, i, j) => {
				if (i === r) {
					return e * constant;
				} else {
					return e;
				}
			});
		}
		return this;
	}

	addMultipleOfRow(r1, r2, constant) {
		if (r1 >= this.rows || r2 >= this.rows || r1 < 0 || r2 < 0) {
			console.log("cannot cannot apply operation on unexisting rows, index out of range");
			return;
		} else {
			let row = this.getRow(r2);
			this.map((e, i, j) => {
				if (i === r1) {
					return e + row[j] * constant;
				} else {
					return e;
				}
			});
		}
		return this;
	}

	rotate(ax, ay = 0, az = 0) {
		if (this.rows === 3) {
			let result = Matrix.rotate3D(this, ax, ay, az);
			this.data = result.data;
			return this;
		} else if (this.rows === 2) {
			let result = Matrix.rotate2D(this, ax);
			this.data = result.data;
			return this;
		} else {
			console.log("cannot rotate matrix with number of rows other than 2 or 3");
			return;
		}
	}

	static rotate(matrix, ax, ay = 0, az = 0) {
		if (matrix.rows === 3) {
			let result = Matrix.rotate3D(matrix, ax, ay, az);
			return result;
		} else if (matrix.rows === 2) {
			let result = Matrix.rotate2D(matrix, ax);
			return result;
		} else {
			console.log("cannot rotate matrix with number of rows other than 2 or 3");
			return;
		}
	}

	static rotate2D(matrix, angle) {
		if (matrix.rows !== 2) {
			console.log("cannot rotate matrix with number of rows other than 2 with this function, try functions rotate3D or rotate");
			return;
		} else {
			return Matrix.multiply(Matrix.rotationMatrix2x2(angle), matrix);
		}
	}

	static rotate3D(matrix, ax, ay, az) {
		if (matrix.rows !== 3) {
			console.log("cannot rotate matrix with number of rows other than 3 with this function, try functions rotate3D or rotate");
			return;
		} else {
			return Matrix.multiply(Matrix.rotationMatrix3x3(ax, ay, az), matrix);
		}
	}

	static rotationMatrix2x2(angle) {
		let result = new Matrix(2, 2);
		let toRad = angle * 0.0174533;
		let sinAng = Math.sin(toRad);
		let cosAng = Math.cos(toRad);
		result.setRow(0, [cosAng, -sinAng]);
		result.setRow(1, [sinAng, cosAng]);
		return result;
	}

	static rotationMatrix3x3(angleX, angleY, angleZ) {
		let result = new Matrix(3, 3);
		let toRadX = angleX * 0.0174533;
		let toRadY = angleY * 0.0174533;
		let toRadZ = angleZ * 0.0174533;
		let sinX = Math.sin(toRadX);
		let cosX = Math.cos(toRadX);
		let sinY = Math.sin(toRadY);
		let cosY = Math.cos(toRadY);
		let sinZ = Math.sin(toRadZ);
		let cosZ = Math.cos(toRadZ);
		result.setRow(0, [cosZ * cosY, cosZ * sinY * sinX - sinZ * cosX, cosZ * sinY * cosX + sinZ * sinX]);
		result.setRow(1, [sinZ * cosY, sinZ * sinY * sinX + cosZ * cosX, sinZ * sinY * cosX - cosZ * sinX]);
		result.setRow(2, [-sinY, cosY * sinX, cosY * cosX]);
		return result;
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

	static identity(dimentions) {
		let result = new Matrix(dimentions, dimentions);
		result.map((e, i, j) => {
			if (i === j) {
				return 1;
			} else {
				return 0;
			}
		});
		return result;
	}

	clone() {
		return new Matrix(this.rows, this.cols)
			.map((e, i, j) => this.data[i][j]);
	}
}