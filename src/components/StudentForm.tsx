import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
let renderCount = 0;

type FormValues = {
  studentname: string;
  email: string;
  regno: string;
};
export const StudentForm = () => {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        studentname: "Batman",
        email: data.email,
        regno: "123s",
      };
    },
  });
  const { register, control, handleSubmit, formState } = form;
  //const {name,ref,onChange,onBlur } = register("username")
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  renderCount++;
  return (
    <div>
      <h1>StudentForm {renderCount / 2}</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="studentname">Student name</label>
          <input
            type="text"
            id="studentname"
            {...register("studentname", {
              required: "Student name is required",
            })}
            // ref={ref}
            // onChange={onChange}
            // onBlur={onBlur}
          />
        </div>
        <div className="form-control">
          <p className="error">{errors.studentname?.message}</p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
              // validate: (fieldValue) => {
              //   return fieldValue !=="admin@example.com" || "Enter a different email address"
              //}
            })}
          />
        </div>
        <div className="form-control">
          <p className="error">{errors.email?.message}</p>
          <label htmlFor="regno">Registration number</label>
          <input
            type="text"
            id="regno"
            {...register("regno", {
              required: {
                value: true,
                message: "Registration number is required",
              },
            })}
          ></input>
          <p className="error">{errors.regno?.message}</p>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
export default StudentForm;
