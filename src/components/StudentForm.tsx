import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
let renderCount = 0;

type FormValues = {
  studentname: string;
  email: string;
  regno: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};
export const StudentForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      // defaultValues: async () => {
      //   const response = await fetch(
      //     "https://jsonplaceholder.typicode.com/users/1"
      //   );
      //   const data = await response.json();
      //   return {
      studentname: "Sukanya",
      email: "example@example.com",
      regno: "123",
      social: {
        twitter: "twitterprofile",
        facebook: "facebookprofile",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),

      // };
    },
  });
  const { register, control, handleSubmit, formState } = form;
  //const {name,ref,onChange,onBlur } = register("username")
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

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
          <p className="error">{errors.studentname?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Student email is required",
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
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="regno">Student Registration number</label>
          <input
            type="text"
            id="regno"
            {...register("regno", {
              required: {
                value: true,
                message: "Registration number is required",
              },
            })}
          />
          <p className="error">{errors.regno?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: "Twitter is required",
            })}
          ></input>
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: "Primary phone number is required",
            })}
          ></input>
          <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1", {
              required: "Primary phone number is required",
            })}
          ></input>
          <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {
                    index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
             Remove phone number
            </button>
                    )
                  }
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
            
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="age">Date of Birth</label>
          <input
            type="date"
            id="dob="
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
export default StudentForm;
