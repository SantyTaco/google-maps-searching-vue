import { sampleData } from "@/assets/mock-data/sample-data"

export const getSearchingData = (inputValue) => {
    const searchingSampleData = sampleData;
    console.log('inputValue', inputValue);

    const data = searchingSampleData.filter((item) => item.name.includes(inputValue));

    return data;
}