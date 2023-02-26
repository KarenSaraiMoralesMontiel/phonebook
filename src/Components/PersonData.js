import React from "react";

const PersonData = ({person}) =><p key={person.id}> {person.name} {person.number}</p>

export default PersonData