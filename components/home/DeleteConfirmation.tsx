"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteEvent } from "@/lib/actions/event.actions";
import { DeleteEventParams } from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";

function DeleteConfirmation({ eventId }: { eventId: string }) {
  const pathname = usePathname();

  const handleDeleteEvent = async () => {
    await deleteEvent({ eventId, path: pathname });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image
          src="/assets/icons/delete.svg"
          alt="delete"
          width={24}
          height={24}
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteEvent}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteConfirmation;
