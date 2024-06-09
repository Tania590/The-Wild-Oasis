import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { supabaseURL } from "../../services/supabase";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully created");
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully edited");
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isUpdating;
  const onSubmit = (data) => {
    if (isEditSession) {
      const hasImage = data.image?.startsWith?.(supabaseURL);

      editCabin({
        newCabin: hasImage ? data : { ...data, image: data.image[0] },
        id: editId,
      });
    } else {
      createCabin({ ...data, image: data.image[0] });
    }
  };

  const onError = (e) => console.log(e);
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= Number(getValues("regularPrice")) ||
              "Discount can not be greater than the regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          type="text"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        {/* disable (may be ) */}
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

// import { useForm } from "react-hook-form";

// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createCabin } from "../../services/apiCabins";
// import toast from "react-hot-toast";
// import FormRow from "../../ui/FormRow";

// function CreateCabinForm() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     getValues,
//   } = useForm();

//   const queryClient = useQueryClient();

//   const { mutate, isPending: isCreating } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cabins"] });
//       toast.success("Cabin successfully created");
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const onSubmit = (data) => {
//     // onSubmit runs for both creating and editing cabin

//     // 1. editing cabin:
//     console.log(data);
//     // mutate({ ...data, image: data.image[0] });
//     // 2. creating cabin:
//     // mutate({ ...data, image: data.image[0] });
//   };

//   const onError = (e) => console.log(e);
//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="Cabin name" error={errors?.name?.message}>
//         <Input
//           disabled={isCreating}
//           type="text"
//           id="name"
//           {...register("name", { required: "This field is required" })}
//         />
//       </FormRow>
//       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           disabled={isCreating}
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be at least 1",
//             },
//           })}
//         />
//       </FormRow>
//       <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
//         <Input
//           disabled={isCreating}
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Price should be at least 1",
//             },
//           })}
//         />
//       </FormRow>
//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           disabled={isCreating}
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This field is required",
//             validate: (value) =>
//               value <= Number(getValues("regularPrice")) ||
//               "Discount can not be greater than the regular price",
//           })}
//         />
//       </FormRow>
//       <FormRow
//         label="Description for website"
//         error={errors?.description?.message}
//       >
//         <Textarea
//           disabled={isCreating}
//           type="text"
//           id="description"
//           defaultValue=""
//           {...register("description", { required: "This field is required" })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         {/* disable (may be ) */}
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Add new cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;
