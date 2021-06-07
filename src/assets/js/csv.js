
function handleCsv(csv) {
    const lines = csv.split("\r\n");
    const res = [];
    lines.splice(0, 1);
    for (let line of lines) {
        let elements = line.split(";");
        let date = elements[0].split("-");
        res.push({
            date: new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]) + 1),
            description: elements[1],
            accountName: elements[4],
            amount: parseFloat(elements[3])
        })
    }
    return res;
}

export {handleCsv};
