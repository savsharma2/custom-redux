const getTemplate = async ({ data, text }) => {
  return data
    .map((country, i) => {
      const indexOfText = country.name
        .toLowerCase()
        .indexOf(text.toLowerCase());
      let firstString = country.name.substr(0, indexOfText);
      let middleString = country.name.substr(indexOfText, text.length);
      let lastString = country.name.substring(
        indexOfText + text.length,
        country.name.length
      );
      return `<div data-name="${country.name}" class="country" tabindex="${i}"><span>${firstString} </span><b> ${middleString}</b> <span>${lastString}</span></div>`;
    })
    .join("");
};

export { getTemplate };
{
  /* <input type="hidden" value="${country.name}"></input> */
}
