import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Search() {
  const router = useRouter();
  const query = router.query["q"];

  const results = [
    {
      name: "John Doe",
      date: "11/12/23",
      notes:
        "First, I gather all of my receipts and categorize them based on the expense type. Then, I open the expense reporting tool and enter each expense item one by one, along with the corresponding date, amount, and category. Once I have entered all of my expenses, I attach a PDF of my receipts to the report and submit it to my manager for approval.",
    },
    {
      name: "John Doe",
      date: "11/12/23",
      notes:
        "First, I gather all of my receipts and categorize them based on the expense type. Then, I open the expense reporting tool and enter each expense item one by one, along with the corresponding date, amount, and category. Once I have entered all of my expenses, I attach a PDF of my receipts to the report and submit it to my manager for approval.",
    },
    {
      name: "John Doe",
      date: "11/12/23",
      notes:
        "the first step is to collect all of the necessary information and documents from the new hire, such as their personal details, tax forms, and employment contract. Then, I enter this information into our HR system, which generates all of the necessary accounts and access rights for the new employee. After that, I schedule an orientation meeting with the new hire to go over company policies and procedures, as well as any specific job duties and expectations. Finally, I follow up with the employee regularly during their first few weeks to ensure a smooth transition into their new role.",
    },
    {
      name: "John Doe",
      date: "11/12/23",
      notes:
        "First, I gather all of my receipts and categorize them based on the expense type. Then, I open the expense reporting tool and enter each expense item one by one, along with the corresponding date, amount, and category. Once I have entered all of my expenses, I attach a PDF of my receipts to the report and submit it to my manager for approval.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="pt-10 lg:grid md:grid-cols-11 gap-16">
          <div className="col-span-4">
            <h1 className="text-4xl mb-12">{query}</h1>
            <div className="border-gray-300 border-[1px] rounded-xl py-8 px-10 text-md leading-relaxed bg-white opacity-70 mb-6">
              The process typically begins by gathering all of the necessary
              information and documents required to complete the task at hand.
              This information is then entered into a system or platform that
              generates the necessary outputs or actions based on the input
              data. Next, a meeting or session may be scheduled to review
              policies, procedures, or other specific details related to the
              task or process. Finally, ongoing support and follow-up may be
              provided to ensure a smooth and successful completion of the
              process or task.
            </div>
          </div>
          <div className="col-span-7">
            <div className="md:columns-2 gap-6">
              {results.map(({ name, date, notes }) => (
                <div className="break-inside-avoid-column border-[1px] border-gray-300 rounded-xl py-8 px-10 mb-6 text-sm bg-white bg-opacity-70">
                  <div className="flex justify-between px-2 mb-4">
                    <div className="border-2 rounded-md px-5 py-2 bg-white bg-opacity-100">
                      <p>{name}</p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p>{date}</p>
                    </div>
                  </div>
                  <p>{notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
