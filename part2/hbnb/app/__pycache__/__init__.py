�
    �<�gr  �                   �"   � d dl mZ d dlmZ d� Zy)�    )�Flask)�Apic                  �D   � t        t        �      } t        | dddd��      }| S )Nz1.0zHBnB APIzHBnB Application APIz/api/v1/)�version�title�description�doc)r   �__name__r   )�app�apis     �%/root/hbnb/part2/hbnb/app/__init__.py�
create_appr      s&   � �
��/�C�
�c�5�
�@V�\f�
g�C�
 �J�    N)�flaskr   �flask_restxr   r   � r   r   �<module>r      s   �� � �r   