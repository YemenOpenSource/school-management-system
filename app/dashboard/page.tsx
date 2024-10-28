import Button from "@/components/ui/button";
import Title from "@/components/ui/title";
import { IClientResponse, IDepartment, IInstructor, IStudent, ISubject, IUser } from "@/definitions";
import {
  getAllDepartments,
  getAllInstructors,
  getAllStudents,
  getAllSubjects,
  getAllUsers,
  getUserById,
} from "@/lib/actions";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function page({ }: Props) {
  const users = (await getAllUsers()) as IClientResponse<IUser[]>;
  const instructors = await getAllInstructors() as IClientResponse<IInstructor[]>;
  const students = await getAllStudents() as IClientResponse<IStudent[]>;
  const departments = await getAllDepartments() as IClientResponse<IDepartment[]>;
  const subjects = await getAllSubjects() as IClientResponse<ISubject[]>;

  const usersList = users?.data?.slice(0, 5)?.map((user) => (
    <li className="" key={user?.id}>
      <Link href={'dashboard/users/' + user?.id} className="hover:underline p-2 border-transparent border-b hover:bg-gray-50 flex justify-between w-full text-gray-600 text-sm font-normal">
        <span className="">
          {user?.fullName}
        </span>
        <span>
          {user?.email}
        </span>
      </Link>
    </li>
  ));

  const instructorsList = instructors?.data?.slice(0, 5)?.map((instructor) => (
    <li className="" key={instructor?.id}>
      <Link href={'dashboard/instructors/' + instructor?.id} className="hover:underline p-2 border-transparent border-b hover:bg-gray-50 flex justify-between w-full text-gray-600 text-sm font-normal">
        <span className="">
          {instructor?.name}
        </span>
        <span>
          {instructor?.position}
        </span>
      </Link>
    </li>
  ));

  const studentsList = students?.data?.slice(0, 5)?.map((student) => (
    <li className="" key={student?.id}>
      <Link href={'dashboard/students/' + student?.id} className="hover:underline p-2 border-transparent border-b hover:bg-gray-50 flex justify-between w-full text-gray-600 text-sm font-normal">
        <span className="">
          {student?.name}
        </span>
        <span>
          {student?.address}
        </span>
      </Link>
    </li>
  ));

  const departmentsList = departments?.data?.slice(0, 5)?.map((department) => (
    <li className="" key={department?.id}>
      <Link href={'dashboard/departments/' + department?.id} className="hover:underline p-2 border-transparent border-b hover:bg-gray-50 flex justify-between w-full text-gray-600 text-sm font-normal">
        <span className="">
          {department?.name}
        </span>
        {/* <span>
          {department?}
        </span> */}
      </Link>
    </li>
  ));

  const subjectsList = subjects?.data?.slice(0, 5)?.map((subject) => (
    <li className="" key={subject?.id}>
      <Link href={'dashboard/subjects/' + subject?.id} className="hover:underline p-2 border-transparent border-b hover:bg-gray-50 flex justify-between w-full text-gray-600 text-sm font-normal">
        <span className="">
          {subject?.name}
        </span>
        <span>
          {subject?.period}
        </span>
      </Link>
    </li>
  ));

  return (
    <div>
      <Title title="Dashboard" />
      <div className="DHASBOARDCONTAINER grid md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        <div className="border border-gray-300 rounded-sm p-2">
          <Button href="/dashboard/users" width="initial" size="lg" className="w-fit text-base font-medium !p-2" variant="link">Users ({users?.data?.length})</Button>
          <ul className="">{usersList}</ul>
        </div>
        <div className="border border-gray-300 rounded-sm p-2">
          <Button href="/dashboard/instructors" width="initial" size="lg" className="w-fit text-base font-medium !p-2" variant="link">Instructors ({instructors?.data?.length})</Button>
          <ul>
            {instructorsList}
          </ul>
        </div>
        <div className="border border-gray-300 rounded-sm p-2">
          <Button href="/dashboard/students" width="initial" size="lg" className="w-fit text-base font-medium !p-2" variant="link">Students ({students?.data?.length})</Button>
          <ul>
            {studentsList}
          </ul>
        </div>
        <div className="border border-gray-300 rounded-sm p-2">
          <Button href="/dashboard/departments" width="initial" size="lg" className="w-fit text-base font-medium !p-2" variant="link">Departments ({departments?.data?.length})</Button>
          <ul>
            {departmentsList}
          </ul>
        </div>
        <div className="border border-gray-300 rounded-sm p-2">
          <Button href="/dashboard/subjects" width="initial" size="lg" className="w-fit text-base font-medium !p-2" variant="link">Subjects ({subjects?.data?.length})</Button>
          <ul>
            {subjectsList}
          </ul>
        </div>
      </div>
    </div>
  );
}
