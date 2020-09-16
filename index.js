const init = () => {
  let employers = [];

  const form = document.querySelector("#form");
  const retireBtn = document.querySelector("#btnRetire");
  const sumBtn = document.querySelector("#btnSum");
  const firstRow = document.querySelector(".header-row");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validation()) {
      addEmployee(employers);
      displayTable(employers);
      form.reset();
    } else {
      alert("invalid input!!!!");
    }
  });

  retireBtn.addEventListener("click", () => {
    employers = removeEmployers(employers);
  });

  sumBtn.addEventListener("click", () => sumOfSalaries(employers));

  firstRow.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".arrow")) {
      sortFunction(employers, event.target);
    }
  });
};

const addEmployee = (employers) => {
  const name = document.querySelector("#name").value;
  const birthday = document.querySelector("#birthday").value;
  const employmentDate = document.querySelector("#employmentDate").value;
  const salary = document.querySelector("#salary").value;

  employers.push({
    checked: false,
    name: name,
    birthday: +birthday,
    employmentDate: new Date(employmentDate),
    salary: +salary,
  });

  showCountOfEmployers(employers);
};

const showCountOfEmployers = (employers) => {
  document.querySelector(
    "#countEmployee"
  ).innerHTML = `Number of employees: ${employers.length}`;
};

const displayTable = (employers) => {
  const tbody = document.querySelector("#tbody");
  tbody.innerHTML = ``;

  employers.forEach((el) => {
    tbody.innerHTML += `
          <tr class="employee">
            <td><input class="check" type="checkbox" ${
              el.checked ? "checked" : ""
            }></td>
            <td>${el.name}</td>
            <td>${el.birthday}</td>
            <td>
            ${el.employmentDate.getDate()}.${
      el.employmentDate.getMonth() + 1
    }.${el.employmentDate.getFullYear()}
            </td>
            <td>${el.salary}</td>
          </tr>`;
  });
};

const removeEmployers = (employers) => {
  const employerNodeArr = [...document.querySelectorAll(".employee")];

  employerNodeArr.forEach((el, i) => {
    if (el.querySelector(".check").checked) {
      employers[i].checked = true;
    }
  });

  const newEmployers = employers.filter((el) => !el.checked);
  displayTable(newEmployers);

  showCountOfEmployers(newEmployers);

  return newEmployers;
};

const sumOfSalaries = (employers) => {
  const sumNode = document.querySelector("#salarySum");
  const salarySum = employers.reduce((s, el) => (s += el.salary), 0);

  sumNode.innerHTML = `Sum $: ${salarySum}`;
};

const validation = () => {
  const name = document.querySelector("#name").value;
  const birthday = document.querySelector("#birthday").value;
  const employmentDate = document.querySelector("#employmentDate").value;
  const salary = document.querySelector("#salary").value;

  const isValidName = Boolean(name.trim());
  const isValidBirthday = Number(birthday) ? true : false;
  const isValidEmploymentDate = Boolean(employmentDate);
  const isValidSalary = Number(salary) ? true : false;

  return (
    isValidName && isValidBirthday && isValidEmploymentDate && isValidSalary
  );
};

const sortFunction = (employers, arrowNode) => {
  const fieldForSort = arrowNode.closest("td").className;
  const flag = arrowNode.classList[0];

  employers.sort((a, b) => {
    if (flag === "top") {
      return b[fieldForSort] - a[fieldForSort];
    }
    return a[fieldForSort] - b[fieldForSort];
  });

  displayTable(employers);
};

init();
