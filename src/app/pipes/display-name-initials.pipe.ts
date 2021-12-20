import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'displayNameInitials' })
export class DisplayNameInitials implements PipeTransform {
  transform(name: string | undefined | null): string {
    if (!name) return '';

    const names = name.split(' ');
    if (!names.length) return '';

    return `${names?.[0].charAt(0)}${names?.[1].charAt(0)}`;
  }
}
