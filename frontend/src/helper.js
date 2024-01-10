export const formatJson = (listOfDictionaries) => {
    let result = []
    listOfDictionaries.reduce((accumulator, current, index) => {
        let existingItem = result.find(x => x.exerciseName === current.exerciseName)
        if (existingItem) {
            existingItem.setsNumber += current.setsNumber;
            existingItem.repsNumber += `-${current.repsNumber}`
        }
        else {
            result.push({
                muscleGroup: current.muscleGroup,
                exerciseName: current.exerciseName,
                repsNumber: `${current.repsNumber}`,
                setsNumber: current.setsNumber
            })
        }
    }, [])

    return result
};

export const formatList = (listOfLists) => {

    const workoutGroups = []
    const groupCounts = []

    listOfLists.forEach( item => {
        const [group, count] = item
        workoutGroups.push(group)
        groupCounts.push(count)
    })

    return {workoutGroups, groupCounts}
}


export const wrangleDate = () => {

    const today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1; // Months are zero-based
    const year = today.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return day + '-' + month + '-' + year;
}

console.log(wrangleDate())


const example = [
    {
        "muscleGroup": "Legs",
        "exerciseName": "Legs press",
        "setsNumber": 1,
        "repsNumber": 10
    },
    {
        "muscleGroup": "Legs",
        "exerciseName": "Legs press",
        "setsNumber": 1,
        "repsNumber": 12
    },
    {
        "muscleGroup": "Legs",
        "exerciseName": "Legs press",
        "setsNumber": 1,
        "repsNumber": 8
    },
    {
        "muscleGroup": "Chest",
        "exerciseName": "Chest press",
        "setsNumber": 1,
        "repsNumber": 10
    },
    {
        "muscleGroup": "Chest",
        "exerciseName": "Chest press",
        "setsNumber": 2,
        "repsNumber": 14
    },
    {
        "muscleGroup": "Abs",
        "exerciseName": "Leg raises",
        "setsNumber": 2,
        "repsNumber": 14
    }
]
