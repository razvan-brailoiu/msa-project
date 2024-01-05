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
