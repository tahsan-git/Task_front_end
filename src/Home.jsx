import { useEffect, useState } from "react";

const Home = () => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pendingTask, setPendingTask] = useState([]);
  const [complete, setComplete] = useState(0);

 

  const completeHandle = async (task_id) => {
    console.log(task_id)
    setComplete((count) => count+1)
    try{
      const response = await fetch(`https://task-backend-l5oz.onrender.com/t/${task_id}`,{
        method: "DELETE",
      });
      if(response.ok){
        const result = await response.json()
        setPendingTask((prev) => prev.filter((item) => item._id !== task_id))
      }
    }
    catch(error){
      console.error(error)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { task, date } = e.target;
    const data = { task: task.value, date: date.value };

    try {
      const response = await fetch("https://task-backend-l5oz.onrender.com/t", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("unsuccess");
      }

      const result = await response.json();
      // Update task list
      setPendingTask((prevTasks) => [...prevTasks, result]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch("https://task-backend-l5oz.onrender.com/t_list")
      .then((res) => res.json())
      .then((data) => setPendingTask(data))
      .catch((error) => console.error(error));
  }, []);
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 text-slate-100 font-inter antialiased">
      <div className="max-w-6xl mx-auto p-6 lg:p-12">
        <header className="flex items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Tahsan — Tasks
            </h1>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <article className="glass soft-shadow rounded-2xl p-6 lg:p-8 border border-white/10">
              <form className="flex flex-col sm:flex-row items-center gap-3" onSubmit={handleSubmit}>
                <input
                  name="task"
                  aria-label="Task title"
                  placeholder="Task add korun"
                  className="flex-1 bg-transparent border border-white/10 rounded-xl px-4 py-3 placeholder:text-slate-400 focus:outline-none"
                />
                <input
                  name="date"
                  type="date"
                  className="bg-transparent border border-white/10 rounded-xl px-3 py-2 text-sm"
                />
                <button className="bg-red-500 mt-2 sm:mt-0 px-4 py-2 rounded-xl font-medium accent text-black shadow">
                  Add
                </button>
              </form>

              <div className="mt-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Tasks</h2>
                <div className="text-sm text-slate-400">Showing recent</div>
              </div>

              {pendingTask.map((item) => (
                <ul className="mt-6 space-y-4" key={item.id}>
                  <li className="bg-indigo-950/40 p-4 rounded-xl flex items-start gap-4 border border-white/10">
                    <div className="flex-shrink-0">
                      <button onClick={() => completeHandle(item._id)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:cursor-pointer">
                        ✓
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-md font-semibold truncate">{item.task}</h3>
                        <div className="text-xs text-slate-400">{item.date}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              ))}
            </article>
          </section>

          <aside className="glass soft-shadow rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Overview</h2>
              <div className="text-sm text-slate-400">This week</div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="bg-indigo-950/40 p-4 rounded-lg text-center">
                <div className="text-xs text-slate-400">Total</div>
                <div className="mt-2 text-2xl font-bold">{pendingTask.length}</div>
              </div>
              <div className="bg-indigo-950/40 p-4 rounded-lg text-center">
                <div className="text-xs text-slate-400">Completed</div>
                <div className="mt-2 text-2xl font-bold text-emerald-400">{complete}</div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Home;
