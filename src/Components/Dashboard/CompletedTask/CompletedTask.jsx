import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import AddTask from "../AddTask/AddTask";
import Swal from "sweetalert2";
import UpdateTask from "../UpdateTask/UpdateTask";
import Loading from "../../../SharePage/Loading/Loading";

function CompletedTask() {
  const [axiosSecure] = useAxiosSecure();
  const [expandedTasks, setExpandedTasks] = useState({});
  const [selectedTask, setSelectedTask] = useState(null); // State to track expanded tasks

  const {
    data: allTask = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allTask"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allTask");
      return res.data;
    },
  });

  const toggleTaskDescription = (index) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDelete = (task) => {
    Swal.fire({
      title: "Are you sure you delete this task?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/task/${task?._id}`).then((res) => {
          if (res?.data?.acknowledged === true) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Task deleted successfully",
              showConfirmButton: false,
              timer: 2500,
            });
            refetch();
          }
        });
      }
    });
  };

  const openUpdateModal = (task) => {
    setSelectedTask(task); // Set selected task
    document.getElementById("my_modal_4").showModal();
  };
  refetch();

  // Filter tasks where role === "completed"
  const completedTasks = allTask.filter(
    (task) => task.role === "completed"
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-start">
          <span className="text-2xl font-medium text-white">
            Completed Tasks
          </span>
          <div className="h-1 bg-green-500 rounded-full w-28"></div>
        </div>

        <button
          className="btn rounded-full text-xl border border-[#949aa8]"
          onClick={() =>
            document.getElementById("my_modal_3").showModal()
          }
        >
          <IoMdAdd />
        </button>
        <AddTask />
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {completedTasks.map((task, index) => {
          const showSeeMore = task?.description.length > 150;
          return (
            <div
              key={index}
              className="p-4 text-white bg-gray-800 rounded-lg shadow-md"
            >
              <h2 className="mb-2 text-xl font-bold">
                {task?.title}
              </h2>
              <p className="text-gray-400">
                {expandedTasks[index]
                  ? task?.description
                  : `${task?.description.slice(0, 150)} `}
                {showSeeMore && (
                  <span
                    className="cursor-pointer text-sky-600"
                    onClick={() => toggleTaskDescription(index)}
                  >
                    {expandedTasks[index]
                      ? " see less"
                      : " see more..."}
                  </span>
                )}
              </p>
              <div className="mt-4">
                <p className="text-gray-400 text-start">
                  {task?.dueDate}
                </p>
                <div className="flex justify-between gap-2 mt-2">
                  <button className="px-4 py-2 bg-green-500 rounded-full">
                    Completed
                  </button>
                  <div className="flex items-center gap-2">
                    <FaEdit
                      onClick={() => openUpdateModal(task)} // Pass task to open modal
                      className="text-gray-400 cursor-pointer hover:text-amber-600"
                    />
                    <FaTrash
                      onClick={() => handleDelete(task)}
                      className="text-gray-400 cursor-pointer hover:text-red-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div
          onClick={() =>
            document.getElementById("my_modal_3").showModal()
          }
          className="flex items-center justify-center p-4 text-center bg-gray-800 border-2 border-gray-700 border-dotted rounded-md cursor-pointer hover:bg-gray-700"
        >
          <IoMdAdd className="w-6 h-6 text-white" />
          <p className="ml-2 font-medium text-white">
            Add New Task
          </p>
        </div>
      </div>
      {/* Render UpdateTask modal conditionally */}
      {selectedTask && <UpdateTask task={selectedTask} />}
    </div>
  );
}

export default CompletedTask;
