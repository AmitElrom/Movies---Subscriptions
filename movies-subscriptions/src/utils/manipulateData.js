const FirstLetterCase = (str) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()

const titleCase = (str) => {
      return str.trim().split(/[\s,\t,\n]+/).map(s => FirstLetterCase(s)).join(" ")
} 

const ListCase = (str) => str.split(',').map(str => FirstLetterCase(str.trim()))

export {FirstLetterCase, titleCase, ListCase}