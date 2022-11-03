import { useMediaQuery } from "react-responsive";

export default function DateOfBirth({
  bDay,
  bMonth,
  bYear,
  years,
  handleRegisterChange,
  dateError,
  days,
  months,
}) {
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width:850px",
  });
  const view3 = useMediaQuery({
    query: "(min-width:1170px",
  });
  return (
    <div
      className="reg_col"
      style={{ marginBottom: `${dateError && !view3 && "70px"}` }}
    >
      <div className="reg_line_header">
        Date of birth <i className="info_icon"></i>
      </div>
      <div className="reg_grid">
        <select name="bDay" value={bDay} onChange={handleRegisterChange}>
          {days.map((day, i) => (
            <option value={day} id={i}>
              {day}
            </option>
          ))}
        </select>
        <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
          {months.map((month, i) => (
            <option value={month} id={i}>
              {month}
            </option>
          ))}{" "}
        </select>
        <select name="bYear" value={bYear} onChange={handleRegisterChange}>
          {years.map((year, i) => (
            <option value={year} id={i}>
              {year}
            </option>
          ))}
        </select>
        {dateError && (
          <div className="input_error">
            <div className="error_arrow_bottom"></div>
            {dateError}
          </div>
        )}
      </div>
    </div>
  );
}
