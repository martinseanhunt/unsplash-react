export const findByTest = (wrapper, attrVal) => 
  wrapper.find(`[data-test="${attrVal}"]`)