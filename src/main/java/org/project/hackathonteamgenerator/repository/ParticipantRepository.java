package org.project.hackathonteamgenerator.repository;

import org.project.hackathonteamgenerator.model.Participant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Long> {
}
