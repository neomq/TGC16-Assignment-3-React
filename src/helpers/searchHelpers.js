// update filter options
const updateUsage = (e, useSearch, setUseSearch) => {
    if (useSearch.includes(e.target.value)) {
        let clone = useSearch.slice()
        let indexToRemove = useSearch.findIndex(i => i === e.target.value);
        clone.splice(indexToRemove, 1)
        setUseSearch(clone)
    } else {
        let clone = useSearch.slice()
        clone.push(e.target.value)
        setUseSearch(clone)
    }
}

const updateScent = (e, scentSearch, setScentSearch) => {
    if (scentSearch.includes(e.target.value)) {
        let clone = scentSearch.slice()
        let indexToRemove = scentSearch.findIndex(i => i === e.target.value);
        clone.splice(indexToRemove, 1)
        setScentSearch(clone)
    } else {
        let clone = scentSearch.slice()
        clone.push(e.target.value)
        setScentSearch(clone)
    }
}

const updateBenefits = (e, benefitsSearch, setBenefitsSearch) => {
    if (benefitsSearch.includes(e.target.value)) {
        let clone = benefitsSearch.slice()
        let indexToRemove = benefitsSearch.findIndex(i => i === e.target.value);
        clone.splice(indexToRemove, 1)
        setBenefitsSearch(clone)
    } else {
        let clone = benefitsSearch.slice()
        clone.push(e.target.value)
        setBenefitsSearch(clone)
    }
}

export {
    updateUsage,
    updateScent,
    updateBenefits,
}