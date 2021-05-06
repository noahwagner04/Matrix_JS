# Matrix_JS
This project provides a simple and easy to use matrix class with a lot of functionality.

### Basic Usage

```js
// Creating a matrix is as simple as 
let myMatrix = new Matrix(3, 3);
// where the first parameter is the amount of rows, and the second is the amout of columns

// The contents of the matrix can either be manually added by accessing the data atribute
// WARNING: make sure that this 2d array is the same dimentions as your inputs to the matrix (cols and rows)
myMatrix.data = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];

// or by adding each row / column separately by using the setColumn or setRow functions
myMatrix.setRow(0, [1, 4, 7]);
myMatrix.setRow(1, [2, 5, 8]);
myMatrix.setRow(2, [3, 6, 9]);
```
### Functions
setColumn
```js
/*
setColumn 
sets a specified column index of the matrix to your specified column data
    params
        (int) index - the index of the matrix to set the column data at (starting at 0)
        (1d array) column data - the contents of the column, must fit matrix dimentions
    return value
        (this) the matrix itself
*/
myMatrix.setColumn(0, [1, 2, 3]);
myMatrix.setColumn(1, [4, 5, 6]);
myMatrix.setColumn(2, [7, 8, 9]);
```
getColumn
```js
/*
getColumn 
gets a specified column index of the matrix
    params
        (int) index - the index of the matrix to get the column data at (starting at 0)
    return value
        (1d array) the specified column
*/
myMatrix.getColumn(1);
```
setRow
```js
/*
setRow
sets a specified row index of the matrix to your specified row data
    params
        (int) index - the index of the matrix to set the row data at (starting at 0)
        (1d array) row data - the contents of the row, must fit matrix dimentions
    return value
        (Matrix) the matrix itself
*/
myMatrix.setRow(0, [1, 4, 7]);
myMatrix.setRow(1, [2, 5, 8]);
myMatrix.setRow(2, [3, 6, 9]);
```
getRow
```js
/*
getRow
gets a specified row index of the matrix
    params
        (int) index - the index of the matrix to get the row data at (starting at 0)
    return value
        (1d array) the specified row
*/
myMatrix.getRow(1);
```
getDeterminant3x3
```js
/*
getDeterminant3x3
gets the determinant of this matrix, dimentions must be a 3x3 matrix
    params
        none
    return value
        (float) the determinant of the matrix
*/
let matrixDeterminant = myMatrix.getDeterminant3x3();
```
getDeterminant2x2
```js
/*
getDeterminant2x2
gets the determinant of this matrix, dimentions must be a 2x2 matrix
    params
        none
    return value
        (float) the determinant of the matrix
*/
let matrixDeterminant = myMatrix.getDeterminant2x2();
```
ignoreColumn
```js
/*
ignoreColumn
removes a column specified by an index
    params
        (int) index - the index to remove the column at
    return value
        (Matrix) returns a new matrix with the removed column
*/
let removedColumnMatrix = myMatrix.ignoreColumn(0);
```
ignoreRow
```js
/*
ignoreRow
removes a row specified by an index
    params
        (int) index - the index to remove the row at
    return value
        (Matrix) returns a new matrix with the removed row
*/
let removedRowMatrix = myMatrix.ignoreRow(2);
```
ignoreRowColumn
```js
/*
ignoreRowColumn
removes a row and a column specified by a row index and a column index
    params
        (int) rowIndex - the index to remove the row at
        (int) columnIndex - the index to remove the column at
    return value
        (Matrix) returns a new matrix with the removed row and column
*/
let removedRowColumnMatrix = myMatrix.ignoreRowColumn(2, 0);
```
invert
```js
/*
invert
inverts this matrix using reduced row elimination (assumes the matrix can be invertable)
    params
        none
    return value
        (Matrix) returns this matrix
*/
myMatrix.invert();
```
swapRows
```js
/*
swapRows
swaps two rows specified by two row indices (one of the row elementary operations)
    params
        (int) rowIndex1 - the first index to swap the row at
        (int) rowIndex2 - the second index to swap the row at
    return value
        (Matrix) returns this matrix
*/
myMatrix.swapRows(0, 2);
```
multiplyRowByConst
```js
/*
multiplyRowByConst
multiplies each index of a specified row by a constant (one of the row elementary operations)
    params
        (int) rowIndex - the index of the row to multiply
        (float) constant - the value to multiply by
    return value
        (Matrix) returns this matrix
*/
myMatrix.multiplyRowByConst(2, -5);
```
addMultipleOfRow
```js
/*
addMultipleOfRow
scales one row then adds it to another, only changing the row added to (r1)  (one of the row elementary operations)
    params
        (int) rowIndex1 - the index of the row to be added to, this is the only row that will change
        (int) rowIndex2 - the index of the row to add to r1, also being scaled by a value
        (float) constant - the value to multiply the row by before adding it to r1
    return value
        (Matrix) returns this matrix
*/
myMatrix.addMultipleOfRow(1, 2, -0.3);
```
rotate
```js
/*
rotate
rotates this matrix around the  x, y, and z axis (matrix must have 2 or 3 rows)
    params
        (float) ax - the angle to rotate around the x axis
        (float) ay - the angle to rotate around the y axis
        (float) az - the angle to rotate around the z axis
    return value
        (Matrix) returns this matrix
*/
myMatrix.rotate(90, -20, 30);
```
add
```js
/*
add
adds a value or a matrix with this matrix (if its a matrix, it adds elementwise)
    params
        (float or matrix) value - the value or matrix to add to this matrix
    return value
        (Matrix) returns this matrix
*/
myMatrix.add(7);
myMatrix.add(otherMatrix);
```
subtract
```js
/*
subtract
subtracts a value or a matrix with this matrix (if its a matrix, it adds elementwise)
    params
        (float or matrix) value - the value or matrix to subtract to this matrix
    return value
        (Matrix) returns this matrix
*/
myMatrix.subtract(4);
myMatrix.subtract(otherMatrix);
```
multiply
```js
/*
multiply
multiplies a value or a matrix with this matrix (if its a matrix, it adds elementwise)
    params
        (float or matrix) value - the value or matrix to multiply to this matrix
    return value
        (Matrix) returns this matrix
*/
myMatrix.multiply(0.3);
myMatrix.multiply(otherMatrix);
```
map
```js
/*
map
maps a function to every element in this matrix
    params
        (function) func - the function to be ran on each element (this function recieves three params (e, i, j) e is the element, i and j is current index e is at)
    return value
        (Matrix) returns this matrix
*/
function double(e) {
    return e * 2;
}
myMatrix.map(double);
// or
myMatrix.map((e, i, j) => e * 2);
```
randomize
```js
/*
randomize
randomizes this matrix, each element can be between -1 and 1
    params
        none
    return value
        (Matrix) returns this matrix
*/
myMatrix.randomize();
```
print
```js
/*
print
prints this matrix in the console as a table
    params
        none
    return value
        (Matrix) returns this matrix
*/
myMatrix.print();
```
clone
```js
/*
clone
clones this matrix
    params
        none
    return value
        (Matrix) returns a new matrix exactly like this one
*/
let clone = myMatrix.clone();
```
### Statics
getDeterminantOf
```js
/*
getDeterminantOf
gets the determinant of any sized square matrix
    params
        (Matrix) matrix - the matrix to get the determinant of
    return value
        (float) returns the determinant of the specified matrix
*/
let determinant = Matrix.getDeterminantOf(myMatrix);
```
getInverseOf
```js
/*
getInverseOf
gets the inverse of any sized square matrix (assumes the matrix can be invertable)
    params
        (Matrix) matrix - the matrix to get the inverse of
    return value
        (Matrix) returns the inverse of the specified matrix
*/
let inv = Matrix.getInverseOf(myMatrix);
```
rotate
```js
/*
rotate
rotates a matrix around the x, y, and z axis (matrix must have 2 or 3 rows)
    params
        (float) ax - the angle to rotate around the x axis
        (float) ay - the angle to rotate around the y axis
        (float) az - the angle to rotate around the z axis
    return value
        (Matrix) returns the newly rotated matrix
*/
let rotatedMatrix = Matrix.rotate(myMatrix, 90, -20, 30);
```
rotate2D
```js
/*
rotate2D
rotates a 2d matrix by a provided angle (matrix must have 2 rows)
    params
        (float) a - the angle to rotate the 2D matrix by
    return value
        (Matrix) returns the newly rotated matrix
*/
let rotatedMatrix = Matrix.rotate2D(myMatrix, 90);
```
rotate3D
```js
/*
rotate3D
rotates a 3D matrix around the x, y, and z axis (matrix must have 3 rows)
    params
        (float) ax - the angle to rotate around the x axis
        (float) ay - the angle to rotate around the y axis
        (float) az - the angle to rotate around the z axis
    return value
        (Matrix) returns the newly rotated matrix
*/
let rotatedMatrix = Matrix.rotate3D(myMatrix, 90, -20, 30);
```
rotationMatrix2x2
```js
/*
rotationMatrix2x2
returns the 2x2 rotation matrix of a certain angle
    params
        (float) a - the angle to set the rotation matrix at
    return value
        (Matrix) returns the newly rotated matrix
*/
let rotationMatrix90Deg = Matrix.rotationMatrix2x2(90);
```
rotationMatrix3x3
```js
/*
rotationMatrix3x3
returns the 3x3 rotation matrix of a certain x, y, and z rotation.
    params
        (float) ax - the rotation about the x axis to set the matrix at
        (float) ay - the rotation about the y axis to set the matrix at
        (float) az - the rotation about the z axis to set the matrix at
    return value
        (Matrix) returns the newly rotated matrix
*/
let rotationMatrix = Matrix.rotationMatrix3x3(90, -20, 30);
```
add
```js
/*
add
adds a value or a matrix with a specified matrix (if its a matrix, it adds elementwise)
    params
        (Matrix) matrix - the matrix to add to
        (float or matrix) value - the value or matrix to add to this matrix
    return value
        (Matrix) returns a new matrix
*/
let addedMatrix = Matrix.add(myMatrix, 7);
let addedMatrix2 = Matrix.add(myMatrix, otherMatrix);
```
subtract
```js
/*
subtract
subtracts a value or a matrix with a specified matrix (if its a matrix, it subtracts elementwise)
    params
        (Matrix) matrix - the matrix to subtract to
        (float or matrix) value - the value or matrix to subtract to this matrix
    return value
        (Matrix) returns a new matrix
*/
let subtractedMatrix = Matrix.subtract(myMatrix, 4);
let subtractedMatrix2 = Matrix.subtract(myMatrix, otherMatrix);
```
multiply
```js
/*
multiply
multiplies two matrixes (not element wise), the first matrixes columns has to be equal to the amout of rows in the second
    params
        (Matrix) matrix - the matrix to be multiplied with matrix2
        (Matrix) matrix2 - the matrix to be multiplied with matrix1
    return value
        (Matrix) returns a new matrix with the dimentions of matrix1.rows and matrix2.cols
*/
let newMatrix = Matrix.subtract(myMatrix, otherMatrix);
```
map
```js
/*
map
maps a function to every element in the specified matrix
    params
        (function) func - the function to be ran on each element (this function recieves three params (e, i, j) e is the element, i and j is current index e is at)
        (Matrix) matrix - the matrix to run func on
    return value
        (Matrix) returns a new matrix
*/
function double(e) {
    return e * 2;
}
Matrix.map(myMatrix, double);
// or
Matrix.map(myMatrix, (e, i, j) => e * 2);
```
fromArray
```js
/*
fromArray
creates a one columned matrix from a 1d array
    params
        (Array) array - the array to be made into a matrix
    return value
        (Matrix) returns a new matrix with the dimentions of array.length rows and 1 column
*/
let newMatrix = Matrix.fromArray(aray);
```
toArray
```js
/*
toArray
creates a 1d array from a specified 1d matrix
    params
        (Matrix) matrix - the matrix to be made into an array
    return value
        (Array) returns a new array
*/
let newArray = Matrix.toArray(myMatrix);
```
transpose
```js
/*
transpose
creates a new matrix whose rows are the specified matrix columns, and whose columns are the specified matrix rows
    params
        (Matrix) matrix - the matrix transposed
    return value
        (Matrix) returns the newly transposed matrix
*/
let transposed = Matrix.transpose(myMatrix);
```
identity
```js
/*
identity
creates a new identity matrix who has a 1 at every diagonal index, and zeros everywhere else
    params
        (int) dimention - the dimentions of this new matrix (this is a square matrix so nxn)
    return value
        (Matrix) returns the identity matrix of the specified dimention
*/
let identity = Matrix.identity(3);
```
### Atributes
every matrix only has three atributes 
1. rows - the amount of rows in this matrix 
2. cols - the amount of columns in this matrix
3. data - a 2d array representing the contents of this matrix