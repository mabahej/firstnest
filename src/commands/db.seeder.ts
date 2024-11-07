import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import {
  randEmail,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randPassword,
  randRole,
  randSkill,
  randUserName,
} from '@ngneat/falso';

// import { UserRoleEnum } from '../enums/user-role.enum';
import { Skill } from '../skill/entities/skill.entity';
import { CV } from '../cv/entities/cv.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);
  const userService = app.get(UserService);
  const skillService = app.get(SkillService);
  const users = userService.findAll();
  const usersLength = (await users).length;
  const skills = skillService.findAll();
  const cvs = cvService.findAllForSeeder();

  // run users and skills first and comment the cvs and then run the cvs and comment the users and skills

  // // 1. users:
  // for (let i = 1; i < 10; i++) {
  //   const newUser = {
  //     username: randUserName(),
  //     email: randEmail(),
  //     password: randPassword(),
  //     role: randRole(),
  //   };
  //   await userService.create(newUser);
  // }

  // // 2. skills:
  // for (let i = 1; i < 10; i++) {
  //   const newSkill = new Skill();
  //   newSkill.Designation = randSkill();
  //   await skillService.create(newSkill);
  // }

  // 3. cvs:
  for (let i = 1; i < 10; i++) {
    const newCv = new CV();
    newCv.firstname = randFirstName();
    newCv.name = randLastName();
    newCv.age = Math.floor(Math.random() * 100);
    newCv.cin = randNumber({ min: 10000000, max: 99999999 });
    newCv.job = randJobTitle();
  
    // Vérifiez que la liste des utilisateurs n'est pas vide
    if (usersLength > 0) {
      newCv.user = (await users)[randNumber({ min: 0, max: usersLength - 1 })];
    } else {
      console.error("Aucun utilisateur n'a été trouvé pour associer un CV.");
      continue; // Passer cette itération si aucun utilisateur n'est disponible
    }
  
    newCv.path = '';
    const shuffledSkills = (await skills).sort(() => 0.5 - Math.random());
    newCv.skills = shuffledSkills.slice(0, 3);
  
    try {
      await cvService.createForSeeder(newCv);
    } catch (e) {
      console.error("Erreur lors de la création du CV :", e);
    }
  }
  
  await app.close();
}
bootstrap();
