import { sampleData } from "@/assets/mock-data/sample-data"

export const getSearchingData = (inputValue) => {
    const searchingSampleData = sampleData;
    const data = searchingSampleData.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));

    return data;
}

export const getResultMessage = (resultList) => {
    const NOT_FOUND_MESSAGE = "Nothing is worse than thinking it's trying to load forever!";

    if(resultList?.length > 0) return `Found ${resultList.length} Results`;
    else return NOT_FOUND_MESSAGE;
}