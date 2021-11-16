

const getProfit = (myProduct, productPrice, countPeople) => {
	const procents = [
		[0.15,0.01],
		[0.16,0.02],
		[0.17,0.03,0.01],
		[0.18,0.04,0.02,0.01],
		[0.19,0.05,0.03,0.02,0.01],
		[0.20,0.06,0.04,0.03,0.02,0.01]
	]
	let result = 0;

	procents[myProduct].forEach((procent, index) => {
		result= result + (productPrice*procent*Math.pow(countPeople,index+1))
	})

	return result
}

export default getProfit;
