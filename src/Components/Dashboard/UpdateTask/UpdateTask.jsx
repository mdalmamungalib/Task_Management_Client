import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../SharePage/Loading/Loading";

const UpdateTask = ({ task }) => {
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();


  const {
    data: singleTask = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["singleTask", task?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/singleTask/${task?._id}`);
      return res.data;
    },
    enabled: !!task?._id,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (singleTask) {
      reset({
        title: singleTask.title || "",
        description: singleTask.description || "",
        dueDate: singleTask.dueDate || "",
      });
    }
  }, [singleTask, reset]);

  const onSubmit = async (data) => {
    try {
      const { title, description, dueDate } = data;
      const newData = { title, description, dueDate };

      const res = await axiosSecure.put(`/task/${task?._id}`, newData);
      if (res?.data?.acknowledged === true) {
        reset();
        refetch();
        const dialog = document.getElementById("my_modal_4");
        if (dialog) {
          dialog.close();
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Task updated successfully",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/dashboard/allTasks");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCloseModal = () => {
    const dialog = document.getElementById("my_modal_4");
    if (dialog) {
      dialog.close();
      reset();
    }
  };

  if(isLoading){
    return <Loading/>
  }

  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>
        </form>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Update Task</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-white text-left"
              >
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-600"
              />
              {errors.title && (
                <p className="text-red-500 text-left text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-white text-left"
              >
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-600"
              />
              {errors.description && (
                <p className="text-red-500 text-left text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-white text-left"
              >
                Due Date
              </label>
              <input
                type="date"
                {...register("dueDate", { required: "Due Date is required" })}
                className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-600"
              />
              {errors.dueDate && (
                <p className="text-red-500 text-left text-xs mt-1">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Task
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateTask;
